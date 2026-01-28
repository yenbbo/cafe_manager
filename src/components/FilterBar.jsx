import { categoryList } from "../utils/constants";

const FilterBar = () => {
  return (
    <div className="flex gap-5">
      {categoryList.map((item) => (
        <button
          key={item}
          onClick={() => {}}
          className="px-3 py-1 border border-gray-50 text-white rounded-full bg-blue-500"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
