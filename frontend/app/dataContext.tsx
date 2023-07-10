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
  busy: number,
  setBusy: Dispatch<SetStateAction<number>>;
}

const DataContext = createContext<DataContextType>({
  state: 0,  // 0: connecting; 1: fetching; 2: calculating; 3: done; 4: processing; -1: error; -2: uncompleted error;
  setState: () => 0,
  data: [],
  setData: () => [],
  busy: 0,  // 0: free; 1: canvas1 busy; 2: canvas2 busy; 3: canvas3 busy;
  setBusy: () => 0,
});

const DataContextProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [state, setState] = useState<number>(0);
  const [data, setData] = useState<DataType[]>([]);
  const [busy, setBusy] = useState<number>(0);


  return (
    <DataContext.Provider value={{ state, setState, data, setData, busy, setBusy }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider }