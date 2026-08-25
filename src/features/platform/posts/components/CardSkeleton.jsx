import { Skeleton } from "@heroui/react";

export default function CardSkeleton() {
  return (
    <>
      <div className="space-y-5 rounded-md! bg-surface p-4">
        <Skeleton className="h-10 rounded-md!" />
        <Skeleton className="h-35 rounded-md!" />
        <div className="space-y-3">
          <Skeleton className="h-3 rounded-lg" />
          <Skeleton className="h-3 w-3/5 rounded-lg" />
        </div>
      </div>
    </>
  );
}
