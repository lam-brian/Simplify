import styles from "./Input.module.css";

const Input = ({
  element,
  label,
  id,
  type,
  placeholder,
  rows,
  onInput,
  value,
  required,
  minLength,
}) => {
  const inputChangeHandler = (e) => {
    onInput(e.target.value);
  };

  const renderedElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder || null}
        onChange={inputChangeHandler}
        value={value}
        required={required ? true : false}
        minLength={minLength || undefined}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder || null}
        onChange={inputChangeHandler}
        value={value}
        required={required ? true : false}
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
