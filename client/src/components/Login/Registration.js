import Button from "../FormElements/Button/Button";
import styles from "./Registration.module.css";
import { useState } from "react";
import Vector from "../../images/close-circle.png";
import { simplifyLogo } from "../../images";

const Reg = ({ setOpenModal }) => {
  const [index, setindex] = useState(0);

  const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    if (email && password) {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/home");
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name-signup").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();
    if (name && email && password) {
      const response = await fetch("http://localhost:3001/api/users/", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/home");
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.frame}>
          <button
            className={styles.close}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img className={styles.vector} src={Vector} alt="" />
          </button>
          <img className={styles.logo} src={simplifyLogo} alt="logo" />
          <div hidden={index !== 0}>
            <div className={styles.signup}>Sign up with Simplify</div>
            <form onSubmit={signupFormHandler}>
              <div className={styles.label}>Full name:</div>
              <input
                id="name-signup"
                className={styles.input}
                placeholder="John Smith"
              />
              <div className={styles.label}>Email:</div>
              <input
                id="email-signup"
                className={styles.input}
                placeholder="johnsmith@gmail.com"
              />
              <div className={styles.label}>Password:</div>
              <input
                id="password-signup"
                type="password"
                className={styles.input}
                placeholder="Password"
              />
              
              <pre className={styles.term}>
               <input className={styles.checkbox} type="checkbox" />    I accept the Terms of Use & Privacy Policy
              </pre>
              <Button type="submit" className="btn--secondary">
                <pre className={styles.register}>Sign Up →</pre>
              </Button>
            </form>

            <div className={styles.account}>
              Have an account already?{" "}
              <button
                className={styles.login}
                onClick={() => {
                  setindex(1);
                }}
              >
                Log in
              </button>
            </div>
          </div>
          <div hidden={index !== 1}>
            <div className={styles.signin}>Sign in</div>
            <form onSubmit={loginFormHandler}>
              <div className={styles.label}>Email:</div>
              <input
                id="email-login"
                className={styles.input}
                placeholder="johnsmith@gmail.com"
              />
              <div className={styles.label}>Password:</div>
              <input
                id="password-login"
                type="password"
                className={styles.input}
                placeholder="Password"
              />
            <Button type="submit" className="btn--secondary">
              <pre className={styles.register}>Sign In →</pre>
            </Button>
            </form>
            <div className={styles.account}>
              Go back to{" "}
              <button
                className={styles.login}
                onClick={() => {
                  setindex(0);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reg;
