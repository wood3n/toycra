import React, { useRef, useEffect, useContext } from "react";
import { MyContext } from "./Parent";

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const myContext = useContext(MyContext);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return <input ref={inputRef} value={myContext.value} />;
};

export default Input;
