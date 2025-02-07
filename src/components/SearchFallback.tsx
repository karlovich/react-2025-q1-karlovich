export const SearchFallback = () => {
  return (
    <div className="text-red-500 p-4 m-4 bg-white border border-red-500 rounded">
      Something went wrong, please make search once again or
      <a href="/"> refresh the page.</a>
    </div>
  );
};
