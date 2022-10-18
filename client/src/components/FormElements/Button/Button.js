import styles from "./Button.module.css";

const Button = ({ type, className, style, onClick, children }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${styles.btn} ${className ? styles[className] : ""}`}
      style={style || null}
    >
      {children}
    </button>
  );
};

export default Button;
