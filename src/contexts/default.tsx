import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";

export const DefaultContext = createContext<{
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
} | null>(null);

export function DefaultProvider({ children }: { children?: ReactNode }) {
  const [darkmode, setDarkmode] = useState<boolean>(true);

  return (
    <DefaultContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </DefaultContext.Provider>
  );
}

export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context)
    throw new Error("useDefaultProvider is outside of defaultProvider");

  return context;
}

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
