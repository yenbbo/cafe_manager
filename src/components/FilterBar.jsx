import { categoryList } from "../utils/constants";

const FilterBar = ({
  selectedCategory,
  onSelectedCategory,
  showAll = true,
}) => {
  return (
    <div className="flex gap-5 felx-wrap">
      {showAll && (
        <button
          onClick={() => onSelectedCategory("전체")}
          className={`px-3 py-1 cursor-pointer whitespace-nowrap rounded-full ${selectedCategory === "전체" ? "text-white bg-blue-800" : "border border-blue-800 text-blue-800 bg-white"}`}
        >
          전체
        </button>
      )}

      {categoryList.map((item) => (
        <button
          key={item}
          onClick={() => onSelectedCategory(item)}
          className={`px-3 py-1 cursor-pointer whitespace-nowrap rounded-full ${item === selectedCategory ? "text-white bg-blue-800" : "border border-blue-800 text-blue-800 bg-white"} `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
