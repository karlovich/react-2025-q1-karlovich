import Link from 'next/link';

export const SearchFallback = () => {
  return (
    <div
      className="text-red-500 p-4 m-4 bg-white border border-red-500 rounded"
      data-testid="test-search-fallback"
    >
      Unfortunately, search results are empty. Please make search once again or
      <Link href="/" data-testid="test-search-fallback-link">
        {' '}
        refresh the page.
      </Link>
    </div>
  );
};
