const SearchBar = ({ searchText, onSearch }) => {
  return (
    <div>
      <input
        className="w-full text-sm md:text-base px-3 md:px-4 py-2 md:py-3 font-extralight border rounded-lg"
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
