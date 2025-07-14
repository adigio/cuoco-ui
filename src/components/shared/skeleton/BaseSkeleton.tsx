import { BaseSkeletonProps } from "@/types";

export const BaseSkeleton = ({ className = '', width, height }: BaseSkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-gray-400 rounded ${className}`}
            style={{ width, height }}
        />
    );
};