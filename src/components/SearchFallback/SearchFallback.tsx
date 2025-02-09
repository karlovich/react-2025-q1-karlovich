export const SearchFallback = () => {
  return (
    <div
      className="text-red-500 p-4 m-4 bg-white border border-red-500 rounded"
      data-testid="test-search-fallback"
    >
      Something went wrong, please make search once again or
      <a href="/" data-testid="test-search-fallback-link">
        {' '}
        refresh the page.
      </a>
    </div>
  );
};
