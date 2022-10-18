import { useState } from "react";

import styles from "./Input.module.css";

const Input = ({
  element,
  label,
  id,
  type,
  placeholder,
  changeHandler,
  touchHandler,
  rows,
}) => {
  const [inputValue, setInputValue] = useState("");

  const renderedElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder || null}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputValue}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder || null}
        onChange={changeHandler}
        onBlur={touchHandler}
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
