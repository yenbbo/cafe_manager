import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import InventoryList from "../components/InventoryList";
import { InventoryStateContext } from "../App";
import { useContext, useState } from "react";

const Home = () => {
  const data = useContext(InventoryStateContext);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [needOrder, setNeedOrder] = useState(false);

  // 검색어, 필터에 따라 재고 목록을 보여줘야 함
  const filteredData = data
    .filter(
      (item) =>
        selectedCategory === "전체" || item.category === selectedCategory,
    )
    .filter((item) =>
      item.name
        .toLowerCase()
        .replace(/\s+/g, "") // 문자열 모든 공백 제거하기
        .includes(searchText.toLowerCase().replace(/\s+/g, "")),
    )
    .filter((item) => !needOrder || item.quantity <= item.threshold);

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">재고 관리</h1>
      <h4 className="text-gray-500 mb-6">오늘의 재고 현황을 기록해주세요</h4>
      <div className="space-y-4 mb-10">
        <SearchBar searchText={searchText} onSearch={setSearchText} />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />
      </div>

      <InventoryList
        data={filteredData}
        needOrder={needOrder}
        onClickNeedOrder={() => setNeedOrder(!needOrder)}
      />
    </div>
  );
};

export default Home;
