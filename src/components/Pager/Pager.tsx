'use client';

import { useTheme } from '../../context/ThemeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PagerProps {
  nextUrl: string | null;
  prevUrl: string | null;
}

export const Pager = ({ prevUrl, nextUrl }: PagerProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onMovePage = (url: string | null) => {
    if (url) {
      const page = url.split('page=')[1];
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page);
      router.push(pathname + '?' + params.toString());
    }
  };

  return (
    <div className="flex gap-2 py-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMovePage(prevUrl);
        }}
        className={`${theme === 'dark-mode' ? 'bg-slate-950 text-white hover:bg-slate-700' : 'bg-amber-200 text-black hover:bg-amber-100'} font-bold p-2 rounded ${prevUrl ? 'cursor-pointer' : 'hover:bg-zinc-400 bg-zinc-400'}`}
      >
        Prev
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMovePage(nextUrl);
        }}
        className={`${theme === 'dark-mode' ? 'bg-slate-950 text-white hover:bg-slate-700' : 'bg-amber-200 text-black hover:bg-amber-100'} font-bold p-2 rounded ${nextUrl ? 'cursor-pointer' : 'hover:bg-zinc-400 bg-zinc-400'}`}
      >
        Next
      </button>
    </div>
  );
};
