import { Skeleton } from "@heroui/react";

export default function ProfileSkeleton() {
  return (
    <section className="mt-6">
      {/* Profile Header */}
      <header className="bg-white pb-4 rounded-lg overflow-hidden">
        {/* Cover */}
        <Skeleton className="h-20 rounded-none" />

        <div className="px-4">
          {/* Avatar */}
          <Skeleton className="size-15 rounded-full -translate-y-1/5 outline-4 outline-white" />

          {/* Name + Username */}
          <div className="space-y-2 -mt-1">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>

          {/* Born + Joined */}
          <div className="flex gap-5 mt-4">
            <Skeleton className="h-3 w-28 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>

          {/* Following + Followers */}
          <div className="flex gap-5 mt-4">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      </header>

      {/* Posts by */}
      <div className="flex items-center gap-4 mt-5">
        <div className="flex-1 h-0.5 bg-gray-200 rounded-xl" />

        <Skeleton className="h-6 w-40 rounded-md" />

        <div className="flex-1 h-0.5 bg-gray-200 rounded-xl" />
      </div>
    </section>
  );
}
