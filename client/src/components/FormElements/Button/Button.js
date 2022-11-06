import styles from "./Button.module.css";

const Button = ({ type, className, style, onClick, children, disabled }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${styles.btn} ${className ? styles[className] : ""}`}
      style={style || null}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};

export default Button;
