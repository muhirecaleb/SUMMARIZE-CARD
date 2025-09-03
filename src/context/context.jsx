// context/StorageContext.js
import { createContext, useState, useEffect } from "react";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState(() => {
    const storedData = localStorage.getItem("cards");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(storage));
  }, [storage]);

  return (
    <StorageContext.Provider value={{ storage, setStorage }}>
      {children}
    </StorageContext.Provider>
  );
};
