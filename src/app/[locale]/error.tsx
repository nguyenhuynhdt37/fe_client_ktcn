"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    // Ghi nhận lỗi hệ thống (có thể tích hợp Sentry, v.v.)
    console.error("System Error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          Đã xảy ra lỗi hệ thống
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Hệ thống gặp sự cố không mong muốn khi tải trang này. Vui lòng thử lại.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs font-mono text-gray-400">
            Mã lỗi: {error.digest}
          </p>
        )}
        <div className="mt-6">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
          >
            Thử tải lại trang
          </button>
        </div>
      </div>
    </div>
  );
}
