// import { useSearchParams } from 'react-router';

interface PagerProps {
  nextUrl: string | null;
  prevUrl: string | null;
  onPaging: (page: string) => void;
}

export const Pager = ({ prevUrl, nextUrl, onPaging }: PagerProps) => {
  const onMovePage = (url: string | null) => {
    if (url) {
      const page = url.split('page=')[1];
      onPaging(page);
    }
  };
  return (
    <div className="flex gap-2 py-2">
      <button
        onClick={() => {
          onMovePage(prevUrl);
        }}
        className={`bg-black text-white p-2 rounded ${prevUrl ? 'cursor-pointer hover:bg-gray-800' : 'bg-gray-400 text-gray-800'}`}
      >
        Prev
      </button>
      <button
        onClick={() => {
          onMovePage(nextUrl);
        }}
        className={`bg-black text-white p-2 rounded ${nextUrl ? 'cursor-pointer hover:bg-gray-800' : 'bg-gray-400 text-gray-800'}`}
      >
        Next
      </button>
    </div>
  );
};
