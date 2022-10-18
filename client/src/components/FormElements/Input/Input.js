import { useState, useEffect } from "react";

import styles from "./Input.module.css";

const Input = ({ element, label, id, type, placeholder, rows, onInput }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    onInput(inputValue);
  }, [onInput, inputValue]);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const touchChangeHandler = () => {
    setIsTouched(true);
  };

  const renderedElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder || null}
        onChange={inputChangeHandler}
        onBlur={touchChangeHandler}
        value={inputValue}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder || null}
        onChange={inputChangeHandler}
        onBlur={touchChangeHandler}
        value={inputValue}
      />
    );

  return (
    <div className={styles["form-control"]}>
      <label htmlFor={id}>{label}</label>
      {renderedElement}
    </div>
  );
};

export default Input;
