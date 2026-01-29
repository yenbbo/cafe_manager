import { useNavigate } from "react-router-dom";
import InventoryItem from "./InventoryItem";

const InventoryList = ({ data, needOrder, onClickNeedOrder }) => {
  const nav = useNavigate();

  return (
    <div>
      <div className="flex justify-between mb-3">
        <button
          className={`px-2 py-1 rounded-xl border cursor-pointer ${needOrder ? "bg-red-400 text-white border-red-500" : "text-blue-800 border-blue-800"}`}
          onClick={onClickNeedOrder}
        >
          🚨 발주 필요만 보기
        </button>
        <button
          className="justify-end px-2 py-1 rounded-xl text-blue-800 border border-blue-800 cursor-pointer"
          onClick={() => nav("/add")}
        >
          + 새로운 재고 목록
        </button>
      </div>
      {/* 목록 렌더링 */}
      {data.length === 0 ? (
        <div className="text-center py-10">해당하는 재고가 없습니다.</div>
      ) : (
        data.map((item) => <InventoryItem key={item.id} {...item} />)
      )}
    </div>
  );
};

export default InventoryList;
