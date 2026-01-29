import "./App.css";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import Notfound from "./pages/Notfound";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext, useEffect } from "react";
import { getItemsFromStorage, saveItemsToStorage } from "./utils/localStorage";

// 1. "/": 재고 관리 홈페이지
// 2. "/detail": 각 물품의 상세 정보를 확인하고 수정, 삭제가 가능한 Detail 페이지
// 3. "/add": 물품 추가 페이지

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "UPDATE":
      newState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    case "DELETE":
      newState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    default:
      return state;
  }
  saveItemsToStorage(newState);
  return newState;
}

export const InventoryStateContext = createContext();
export const InventoryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = getItemsFromStorage();
    if (storedData.length > 0) {
      dispatch({
        type: "INIT",
        data: storedData,
      });

      const maxId = Math.max(...storedData.map((item) => item.id));
      idRef.current = maxId + 1;
    }
  }, []);

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
        menu: [],
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
