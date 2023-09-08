export const saveLocalStorage = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const deleteKeyLocalStorage = (key) => {
  localStorage.removeItem(key);
};
