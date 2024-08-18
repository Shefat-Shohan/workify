import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center ">
      <h2 className="text-3xl mb-1 text-white-100">There was a problem</h2>
      <p className="text-gray-400 mb-4 text-md">We could not found the page you were looking for.</p>
      <p className="text-gray-400">
        Go back to the &nbsp;
        <Link className="text-white-100 font-semibold" href="/">
          Homepage
        </Link>
      </p>
    </main>
  );
}
