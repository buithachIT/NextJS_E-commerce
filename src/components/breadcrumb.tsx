'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();

  let segments = pathname.split('/').filter(Boolean);

  if (segments.length > 1) {
    const last = segments[segments.length - 1];
    const isIdLike = /^[a-zA-Z0-9_-]{8,}$/.test(last);
    if (isIdLike) {
      segments = segments.slice(0, -1);
    }
  }

  const buildHref = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="text-md px-5 py-5 md:px-25 text-gray-500"
    >
      <ol className="flex items-center gap-1">
        <li className="flex items-center gap-1">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {segments.length > 0 && <span className="md:px-2 px-1">›</span>}
        </li>

        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const label = decodeURIComponent(seg.replace(/-/g, ' '));

          return (
            <li key={idx} className="flex items-center gap-1 capitalize">
              {!isLast ? (
                <>
                  <Link href={buildHref(idx)} className="hover:underline">
                    {label}
                  </Link>
                  <span className="md:px-2 px-1">›</span>
                </>
              ) : (
                <span className="text-black font-medium">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
