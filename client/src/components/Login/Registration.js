import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logUserIn, signUserUp } from "../../store/login-slice";
import { uiActions } from "../../store/ui-slice";

import Modal from "../UI/Modal/Modal";
import Input from "../FormElements/Input/Input";
import Button from "../FormElements/Button/Button";
import { icons } from "../../images";
import styles from "./Registration.module.css";

const Registration = () => {
  const dispatch = useDispatch();
  const { show: isLoginModal, isLogin: isLoginForm } = useSelector(
    (state) => state.ui.isLoginModal
  );

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();

    if (!enteredEmail || !enteredPassword) return;

    const email = enteredEmail.trim();
    const password = enteredPassword.trim();

    dispatch(logUserIn(email, password));
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const signupHandler = (e) => {
    e.preventDefault();

    if (!enteredName || !enteredEmail || !enteredPassword || !isChecked) return;

    const name = enteredName.trim();
    const email = enteredEmail.trim();
    const password = enteredPassword;

    dispatch(signUserUp(name, email, password));
    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const switchFormHandler = () => {
    dispatch(uiActions.changeLoginModal());
    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
    setIsChecked(false);
  };

  const closeModalHandler = () => {
    dispatch(uiActions.closeLoginModal());
  };

  let formInputs = (
    <>
      <Input
        element="input"
        label="Full Name"
        id="name"
        type="text"
        placeholder="John Smith"
        required
        onInput={setEnteredName}
        value={enteredName}
      />
      <Input
        element="input"
        label="Email"
        id="email"
        type="email"
        placeholder="johnsmith@gmail.com"
        required
        onInput={setEnteredEmail}
        value={enteredEmail}
      />
      <Input
        element="input"
        label="Password"
        id="password"
        type="password"
        minlength="9"
        required
        onInput={setEnteredPassword}
        value={enteredPassword}
      />
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="terms-conditions"
          value={isChecked}
          required
          onChange={() => setIsChecked((state) => !state)}
        />
        <label htmlFor="terms-conditions">
          I accept the <a href="#terms">Terms of Use</a> &{" "}
          <a href="#privacy">Privacy Policy</a>
        </label>
      </div>
    </>
  );

  if (isLoginForm) {
    formInputs = (
      <>
        <Input
          element="input"
          label="Email"
          id="email"
          type="email"
          placeholder="johnsmith@gmail.com"
          required
          onInput={setEnteredEmail}
          value={enteredEmail}
        />
        <Input
          element="input"
          label="Password"
          id="password"
          type="password"
          required
          onInput={setEnteredPassword}
          value={enteredPassword}
        />
      </>
    );
  }

  return (
    <Modal
      show={isLoginModal}
      onCancel={closeModalHandler}
      className="registration"
      header={isLoginForm ? "Log in" : "Sign up"}
      style={{ padding: "4.8rem 3.2rem" }}
      onSubmit={isLoginForm ? loginHandler : signupHandler}
      footer={
        <>
          <Button className="btn--primary" type="submit">
            {isLoginForm ? "Log in" : "Sign up"}
          </Button>
          <p>
            {isLoginForm
              ? "Don't have an account? "
              : "Have an account already? "}
            <Button style={{ width: "unset" }} onClick={switchFormHandler}>
              {isLoginForm ? "Sign up" : "Log in"}
            </Button>
          </p>
        </>
      }
    >
      <>
        <button
          className={styles.closeBtn}
          type="button"
          onClick={closeModalHandler}
        >
          <img src={icons.closeCircle} alt="close form" />
        </button>
        {formInputs}
      </>
    </Modal>
  );
};

export default Registration;
