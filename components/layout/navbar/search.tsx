'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
  return (
    <div className="relative w-full max-w-[550px]">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full max-w-[550px]">
      <div className="relative flex items-center">
        <div className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400">
          <div className="h-4 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
