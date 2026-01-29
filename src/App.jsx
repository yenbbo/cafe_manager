import "./App.css";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import Notfound from "./pages/Notfound";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";

// 1. "/": 재고 관리 홈페이지
// 2. "/detail": 각 물품의 상세 정보를 확인하고 수정, 삭제가 가능한 Detail 페이지
const mockData = [
  {
    id: 0,
    name: "바닐라 파우더",
    category: "파우더",
    quantity: 2,
    threshold: 3,
    menu: ["바닐라 라떼"],
  },
  {
    id: 1,
    name: "블루베리 시럽",
    category: "시럽",
    quantity: 3,
    threshold: 2,
    menu: ["블루베리 요거트 플랫치노", "블루베리 주스"],
  },
  {
    id: 2,
    name: "유자과육베이스",
    category: "베이스",
    quantity: 3,
    threshold: 3,
    menu: ["유자차"],
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const InventoryStateContext = createContext();
export const InventoryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  // 새로운 재고 추가
  const onCreate = (name, category, quantity, threshold) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name,
        category,
        quantity,
        threshold,
      },
    });
  };

  // 기존 재고 수정
  const onUpdate = (id, name, category, quantity, threshold, menu) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        name,
        category,
        quantity,
        threshold,
        menu,
      },
    });
  };
  // 기존 재고 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  // 수량 업데이트
  const onUpdateQuantity = (id, newQuantity) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      dispatch({
        type: "UPDATE",
        data: {
          ...item,
          quantity: newQuantity,
        },
      });
    }
  };

  return (
    <>
      <InventoryStateContext.Provider value={data}>
        <InventoryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
            onUpdateQuantity,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/detail/:id" element={<ItemDetail />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </InventoryDispatchContext.Provider>
      </InventoryStateContext.Provider>
    </>
  );
}

export default App;
