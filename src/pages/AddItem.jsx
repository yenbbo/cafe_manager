import { useContext, useState } from "react";
import { InventoryDispatchContext } from "../App";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  // onCreate 함수 사용하여 새로운 재고 item 추가
  const [input, setInput] = useState({
    name: "",
    category: "",
    quantity: 0,
    threshold: 1, // 최소 재고 기본값
  });

  const nav = useNavigate();

  const { onCreate } = useContext(InventoryDispatchContext);

  // input 변경 시 상태 변경
  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 카테고리 선택 시 상태 변경
  const onSelectedCategory = (category) => {
    setInput({
      ...input,
      category: category,
    });
  };

  // 제출 시 Context를 통해 onCreate 함수 실행
  const onSubmit = () => {
    if (!input.name || !input.category) {
      alert("물품명과 카테고리는 필수입니다!");
      return;
    }
    onCreate(
      input.name,
      input.category,
      Number(input.quantity),
      Number(input.threshold),
    );
    nav("/");
  };

  return (
    <div className="p-4">
      <header className="flex justify-between mb-10 pb-8 border-b border-gray-400">
        <button
          className="justify-start px-2 py-1 rounded-xl text-blue-800 border border-blue-800 cursor-pointer"
          onClick={() => nav(-1)}
        >
          목록으로
        </button>
        <button
          className="justify-end px-2 py-1 rounded-xl text-white bg-blue-800 cursor-pointer"
          onClick={onSubmit}
        >
          만들기
        </button>
      </header>
      {/* 입력 폼 */}
      <div className="space-y-6">
        <div>
          <label className="block mb-2">물품명</label>
          <input
            name="name"
            type="text"
            value={input.name}
            onChange={onChangeInput}
            placeholder="예: 바닐라 파우더"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2">카테고리</label>
          <FilterBar
            selectedCategory={input.category}
            onSelectedCategory={onSelectedCategory}
            showAll={false}
          />
        </div>
        <div>
          <label className="block mb-2">현재 수량</label>
          <input
            name="quantity"
            type="number"
            min="0"
            value={input.quantity}
            onChange={onChangeInput}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1">최소 재고</label>
          <span className="block mb-2 text-gray-500 text-xs">
            재고가 이 수량 이하로 내려가면 재고가 필요하다고 알려드립니다!
          </span>
          <input
            name="threshold"
            type="number"
            min="0"
            value={input.threshold}
            onChange={onChangeInput}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddItem;
