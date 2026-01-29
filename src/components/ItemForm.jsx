import FilterBar from "./FilterBar";

const ItemForm = ({ input, onChangeInput, onSelectedCategory }) => {
  return (
    <div>
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

export default ItemForm;
