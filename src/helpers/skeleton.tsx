import { cn } from "@/lib/utils";


type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
};


export const SidebarSkeleton = () => {
  return (
    <aside className="border-r border-r-[#e5e5e5] hidden lg:block w-[256px] bg-white">
      <section className="flex flex-col p-5 gap-6 h-full">
        
        {/* Logo */}
        <Skeleton className="h-8 w-32 mx-4" />

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((section) => (
            <div key={section} className="flex flex-col gap-3">
              
              {/* Section title */}
              <Skeleton className="h-3 w-20 mx-4" />

              {/* Items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2 px-4 py-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* User card */}
        <div className="flex items-center gap-3 mt-auto p-4 bg-[#F8FAFC] rounded-xl">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </section>
    </aside>
  );
};


export const CardSkeleton = () => {
  return (
    <div className="rounded-xl border p-4 flex flex-col gap-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-3/4" />
    </div>
  );
};