'use client'

import { createContext, useState, Dispatch, SetStateAction } from "react";


export interface DataType { // __rst.push({ x: x, y: y, temp: v, wind: w, rain: r, snow: s, uv: u });
  area: string,
  city: string,
  wc: number[],
  x: number,
  y: number,
  temp: number[],
  wind: number[],
  rain: number[],
  snow: number[],
  uv: number[],
}

export interface DataContextType {
  state: number,
  setState: Dispatch<SetStateAction<number>>,
  data: DataType[],
  setData: Dispatch<SetStateAction<DataType[]>>,
  cities: DataType[],
  setCities: Dispatch<SetStateAction<DataType[]>>,
  busy: number,
  setBusy: Dispatch<SetStateAction<number>>,
  frame: number,
  setFrame: Dispatch<SetStateAction<number>>,
  homeCity: string,
  setHomeCity: Dispatch<SetStateAction<string>>,
}

const DataContext = createContext<DataContextType>({
  state: 0,  // 0: connecting; 1: fetching; 2: preprocessing; 3: done; 4: processing; -1: error; -2: uncompleted error;
  setState: () => 0,
  data: [],
  setData: () => [],
  cities: [],
  setCities: () => [],
  busy: 0,  // 0: free; 1: canvas1 busy; 2: canvas2 busy; 3: canvas3 busy;
  setBusy: () => 0,
  frame: 0,  // 
  setFrame: () => 0,
  homeCity: "",
  setHomeCity: () => "",
});

const DataContextProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [state, setState] = useState<number>(0);
  const [data, setData] = useState<DataType[]>([]);
  const [cities, setCities] = useState<DataType[]>([]);
  const [busy, setBusy] = useState<number>(0);
  const [frame, setFrame] = useState<number>(0);
  const [homeCity, setHomeCity] = useState<string>("");


  return (
    <DataContext.Provider value={{ state, setState, data, setData, cities, setCities, busy, setBusy, frame, setFrame, homeCity, setHomeCity }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider }