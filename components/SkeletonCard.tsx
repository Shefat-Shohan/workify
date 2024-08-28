import { Skeleton } from "./ui/skeleton";
export default function SkeletonCard() {
  return (
    <div className="w-[100%]">
      <div className="card_wrapper w-full h-full">
        <div className="card_content">
          <div className="p-4">
            <div className=" flex flex-col items-stretch">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4 items-center">
                  <div className="text-gray-400 mb-6">
                    <Skeleton className="w-14 h-2 mb-4" />
                  </div>
                </div>
                <div className="text-gray-400 flex items-center">
                  <Skeleton className="w-10 h-2" />
                </div>
              </div>
              <div className="pb-8">
                <Skeleton className="w-60 h-2 mb-2" />
                <Skeleton className="h-2 mb-2 flex-grow" />
                <Skeleton className="h-2 mb-2 flex-grow" />
                <Skeleton className="h-2 flex-grow" />
              </div>
              <div className="flex justify-between items-center my-8">
                <div>
                <Skeleton className="w-20 h-2 mb-1" />
                </div>
                <Skeleton className="w-20 h-2 mb-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
