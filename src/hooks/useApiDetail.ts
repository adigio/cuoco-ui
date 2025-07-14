import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook generico para manejar fetch de detalles con AbortController
 * useMealPrepDetail y useRecipeDetail
 */
export const useApiDetail = <T>(
  fetchFunction: (id: string, signal?: AbortSignal) => Promise<T | undefined>,
  id: string,
  options?: {
    onError?: (error: Error) => void;
  }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { onError } = options ?? {};

  const stableOnError = useCallback(
    (err: Error) => {
      onError?.(err);
    },
    [onError]
  );

  useEffect(() => {
    // Abortar request anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(id, controller.signal);

        if (!controller.signal.aborted) {
          setData(result || null); // Handle undefined results
          setLoading(false);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          setError(error);
          setLoading(false);

          // Call custom error handler if provided
          stableOnError(error);
        }
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [id, fetchFunction, stableOnError]);

  return { data, loading, error };
};
