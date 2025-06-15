interface BaseSkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const BaseSkeleton = ({ className = '', width, height }: BaseSkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-gray-400 rounded ${className}`}
            style={{ width, height }}
        />
    );
};