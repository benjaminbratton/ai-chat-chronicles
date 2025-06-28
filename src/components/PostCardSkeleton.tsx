
import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="flex">
        {/* Vote Section Skeleton */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-l-lg">
          <Skeleton className="w-5 h-5 mb-2" />
          <Skeleton className="w-6 h-4 mb-2" />
          <Skeleton className="w-5 h-5" />
        </div>

        {/* Content Section Skeleton */}
        <div className="flex-1 p-4">
          {/* Post Header Skeleton */}
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton className="w-16 h-5 rounded-full" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-12 h-4" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-12 h-5 rounded" />
          </div>

          {/* Post Title Skeleton */}
          <Skeleton className="w-full h-6 mb-2" />
          <Skeleton className="w-3/4 h-6 mb-3" />

          {/* Post Content Preview Skeleton */}
          <Skeleton className="w-full h-4 mb-1" />
          <Skeleton className="w-5/6 h-4 mb-3" />

          {/* Post Actions Skeleton */}
          <div className="flex items-center space-x-4">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-12 h-6" />
            <Skeleton className="w-12 h-6" />
            <Skeleton className="w-16 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
