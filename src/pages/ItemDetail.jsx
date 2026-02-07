import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InventoryStateContext, InventoryDispatchContext } from "../App";
import ItemForm from "../components/ItemForm";

const ItemDetail = () => {
  const params = useParams();
  const nav = useNavigate();

  const data = useContext(InventoryStateContext);
  const { onUpdate, onDelete } = useContext(InventoryDispatchContext);

  // 해당 id 재고 찾기
  const currentItem = data.find(
    (item) => String(item.id) === String(params.id),
  );

  const [editData, setEditData] = useState(
    currentItem || {
      name: "",
      category: "",
      quantity: 0,
      threshold: 0,
      menu: [],
    },
  );

  const [newMenu, setNewMenu] = useState("");

  if (!currentItem) {
    return <div>존재하지 않는 재고입니다.</div>;
  }

  useEffect(() => {
    if (currentItem) {
      setEditData(currentItem);
    }
  }, [currentItem]);

  const onChangeInput = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectedCategory = (category) => {
    setEditData({
      ...editData,
      category: category,
    });
  };

  const onSubmitItem = () => {
    if (!editData.name || !editData.category) {
      alert("물품명과 카테고리는 필수입니다!");
      return;
    }
    onUpdate(
      params.id,
      editData.name,
      editData.category,
      Number(editData.quantity),
      Number(editData.threshold),
      editData.menu,
    );
    nav("/");
  };

  // item 삭제
  const onDeleteItem = () => {
    if (window.confirm("정말 삭제하시겠습니까? 복구되지 않습니다.")) {
      onDelete(params.id);
      nav("/");
    }
  };

  const addMenu = () => {
    if (!newMenu.trim()) {
      alert("메뉴명을 입력하세요!");
      return;
    }
    setEditData({
      ...editData,
      menu: [...(editData.menu || []), newMenu.trim()],
    });
    setNewMenu(""); // 입력 필드 초기화
  };

  const removeMenu = (index) => {
    setEditData({
      ...editData,
      menu: editData.menu.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-4">
      <header className="flex justify-between mb-10 pb-8 text-sm md:text-base border-b border-gray-400">
        <button
          className="px-2 py-1 rounded-xl text-blue-800 border border-blue-800 cursor-pointer"
          onClick={() => nav(-1)}
        >
          목록으로
        </button>
        <div className="flex gap-4">
          <button
            className="px-2 py-1 rounded-xl text-white bg-blue-800 cursor-pointer"
            onClick={onSubmitItem}
          >
            저장
          </button>
          <button
            className="px-2 py-1 rounded-xl text-white bg-blue-800 cursor-pointer"
            onClick={onDeleteItem}
          >
            삭제
          </button>
        </div>
      </header>

      <ItemForm
        input={editData}
        onChangeInput={onChangeInput}
        onSelectedCategory={onSelectedCategory}
      />
      {/* 품절 목록 */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">
          품절 메뉴 (품절 시 키오스크에서 품절 처리)
        </label>

        {/* 메뉴 추가 입력 */}
        <div className="flex gap-2 mb-4 text-sm md:text-base">
          <input
            type="text"
            value={newMenu}
            onChange={(e) => setNewMenu(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addMenu();
              }
            }}
            placeholder="메뉴명 입력 (예: 바닐라 라떼)"
            className="flex-1 px-2 md:px-3 py-1 md:py-2 border rounded-lg"
          />
          <button
            onClick={addMenu}
            className="px-3 py-2 bg-blue-800 text-white rounded-xl"
          >
            추가
          </button>
        </div>

        {/* 메뉴 목록 */}
        <div className="border border-gray-400 rounded-lg text-sm md:text-base p-4">
          {!editData.menu || editData.menu.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              등록된 메뉴가 없습니다.
            </p>
          ) : (
            <ul className="space-y-2">
              {editData.menu.map((menuItem, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <span>• {menuItem}</span>
                  <button
                    onClick={() => removeMenu(index)}
                    className="text-gray-400 hover:text-blue-800 font-bold text-xl"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
