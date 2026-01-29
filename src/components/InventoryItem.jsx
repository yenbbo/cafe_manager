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
      className={`flex justify-between items-center gap-10 text-lg border-b border-b-gray-200 p-4 ${
        quantity <= threshold ? "bg-red-100" : ""
      }`}
    >
      <div
        className="w-40 cursor-pointer whitespace-nowrap overflow-x-auto"
        onClick={() => nav(`/detail/${id}`)}
      >
        {name}
      </div>

      <Button
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      <div className="w-25">
        {quantity <= threshold && (
          <div
            className="text-sm px-2 py-1 text-center bg-red-300 text-red-600 rounded cursor-pointer"
            onClick={() => nav(`/detail/${id}`)}
          >
            🚨발주 필요
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;
