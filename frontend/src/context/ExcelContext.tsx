import React, { createContext, useState } from "react";

export interface ExcelContextValue {
  data: any[][];
  setData: (data: any[][]) => void;
}

export const ExcelContext = createContext<ExcelContextValue | null>(null);

const ExcelProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<any[][]>([]);

  return (
    <ExcelContext.Provider value={{ data, setData }}>
      {children}
    </ExcelContext.Provider>
  );
};

export default ExcelProvider;
