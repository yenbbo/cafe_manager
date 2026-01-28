import { useState } from "react";
import Button from "../components/Button";
import { categoryList } from "../utils/constants";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import InventoryItem from "../components/InventoryItem";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold">재고 관리</h1>
      <h4 className="text-gray-500">오늘의 재고 현황을 알려주세요</h4>
      <SearchBar />
      <FilterBar />
      <InventoryItem />
      <Button />
    </div>
  );
};

export default Home;
