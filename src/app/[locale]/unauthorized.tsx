import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m0-8v6m0 4h.01M4.93 19h14.14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4.93c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2z"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          401 - Chưa xác thực danh tính
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Vui lòng đăng nhập tài khoản để truy cập vào phân hệ này.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            href="/login"
            className="inline-flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
          >
            Đăng nhập ngay
          </Link>
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
          >
            Về Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
