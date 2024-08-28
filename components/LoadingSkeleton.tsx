import SkeletonCard from "./SkeletonCard";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {"abcdef".split("").map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
