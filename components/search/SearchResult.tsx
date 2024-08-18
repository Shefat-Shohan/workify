import Link from "next/link";

export default function SearchResult({
  result,
}: {
  result: {
    title: string;
    id: string | number;
  };
}) {
  return (
    <Link
      className="p-4 hover:bg-black-200 text-gray-500 text-[16px] font-medium"
      href={`/jobs/${result.id}`}
    >
      {result.title}
    </Link>
  );
}
