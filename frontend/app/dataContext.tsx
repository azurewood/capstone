'use client'

import { createContext, useState, Dispatch, SetStateAction } from "react";


export interface DataType { // __rst.push({ x: x, y: y, temp: v, wind: w, rain: r, snow: s, uv: u });
  x: number;
  y: number;
  temp: [];
  wind: [];
  rain: [];
  snow: [];
  uv: [];
}

export interface DataContextType {
  state: number,
  setState: Dispatch<SetStateAction<number>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

const DataContext = createContext<DataContextType>({
  state: 0,  // 0: connecting; 1: connected; 2: fetching; 3: done; -1: error; -2: uncompleted error;
  setState: () => 0,
  data: [],
  setData: () => []
});

const DataContextProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [state, setState] = useState<number>(0);
  const [data, setData] = useState<DataType[]>([]);


  return (
    <DataContext.Provider value={{ state, setState, data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider }