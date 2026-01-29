const STORAGE_KEY = "inventory_items";

export const getItemsFromStorage = () => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("localStorage 읽기 실패:", error);
    return [];
  }
};

export const saveItemsToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("localStorage 저장 실패:", error);
  }
};
