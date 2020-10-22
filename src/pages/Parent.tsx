import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import Child from "./Child";

export const MyContext = React.createContext({ value: "test" });

const Input: React.FC = () => {
  return (
    <MyContext.Provider value={{ value: "测试" }}>
      <Child />
    </MyContext.Provider>
  );
};

export default Input;
