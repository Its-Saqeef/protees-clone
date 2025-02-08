"use client";
import React, { createContext, useContext, useState } from "react";

const StatesContext = createContext(null);

export const useGlobalStates = () => {
  const context = useContext(StatesContext);

  if (!context) {
    throw new Error('useGlobalStates must be used within a GlobalStates provider');
  }

  return context;
};

function GlobalStates({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <StatesContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </StatesContext.Provider>
  );
}

export default GlobalStates;
