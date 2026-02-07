import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { InventoryDispatchContext } from "../App";

const InventoryItem = ({ id, name, quantity, threshold }) => {
  const nav = useNavigate();
  const { onUpdateQuantity } = useContext(InventoryDispatchContext);
  const onIncrease = (e) => {
    e.stopPropagation();
    onUpdateQuantity(id, quantity + 1);
  };
  const onDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div
      className={`flex justify-between items-center gap-2 md:gap-10 whitespace-nowrap text-base md:text-lg border-b border-b-gray-200 p-2 md:p-4 ${
        quantity <= threshold ? "bg-red-100" : ""
      }`}
    >
      <div
        className="w-24 md:w-40 overflow-auto cursor-pointer"
        onClick={() => nav(`/detail/${id}`)}
      >
        {name}
      </div>

      <Button
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      <div className="w-12 md:w-24">
        {quantity <= threshold && (
          <div
            className="text-sm px-1 md:px-2 py-1 whitespace-nowrap text-center bg-red-300 text-red-600 rounded cursor-pointer"
            onClick={() => nav(`/detail/${id}`)}
          >
            <span className="md:hidden">🚨</span>
            <span className="hidden md:inline">🚨발주 필요</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;
