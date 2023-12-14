"use client"; // Error components must be Client Components
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="my-auto text-gray-300 flex items-center justify-center h-full">
      <h2 className="">Something went wrong!</h2>
      <div>
        <button
          className="mx-3 bg-orange-800 rounded-lg text-gray-400 px-3 py-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
      <Link className="mx-3 bg-orange-200 rounded-lg text-black px-3 py-2" href="/">Go Home</Link>
    </div>
  );
}
