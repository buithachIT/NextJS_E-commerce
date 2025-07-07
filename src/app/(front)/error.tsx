'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
