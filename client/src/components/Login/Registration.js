import Button from "../FormElements/Button/Button";
import styles from "./Registration.module.css";
import { useState } from "react";
import Vector from "../../images/close-circle.png";
import { logo } from "../../images";
const Reg = ({setOpenModal}) => {
  const [index, setindex] = useState(0);
  
  return (
    <>
      <div className={styles.container}>
     
        <div className={styles.frame}>
          <button className={styles.close}
            onClick={() => {
              setOpenModal(false);
            }}
          >
          <img className={styles.vector} src={Vector} alt="" />
          </button>
          <img className={styles.logo} src={logo} />
          <div hidden={index !== 0}>
            <div className={styles.signup}>Sign up with Simplify</div>
            <form>
              <div className={styles.label}>Full name:</div>
              <input className={styles.input} placeholder="John Smith" />
              <div className={styles.label}>Email:</div>
              <input
                className={styles.input}
                placeholder="johnsmith@gmail.com"
              />
              <div className={styles.label}>Password:</div>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
              />
              <input className={styles.checkbox} type="checkbox" />
            </form>
            <div className={styles.term}>
              I accept the Terms of Use & Privacy Policy
            </div>
            <Button className="btn--secondary">
              <pre className={styles.register}>Sign Up →</pre>
            </Button>
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
            <form>
              <div className={styles.label}>Email:</div>
              <input
                className={styles.input}
                placeholder="johnsmith@gmail.com"
              />
              <div className={styles.label}>Password:</div>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
              />
            </form>
            <Button className="btn--secondary">
              <pre className={styles.register}>Sign In →</pre>
            </Button>
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
