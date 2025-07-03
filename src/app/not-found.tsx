'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center border">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-full transition"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
