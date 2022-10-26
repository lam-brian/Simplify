import styles from "./Settings.module.css";

const Settings = () => {
    return (
      <>
        <div className={styles.container}>
          Account Setting
          <div className={styles.avatar}>B</div>
          <div className={styles.settings}>
            <div className={styles.profile}>
              <h3>Profile Details</h3>
              <div className={styles.label}>Full name</div>
              <input id = "name"  type="text" value = "John Smith" className={styles.input} />
              <div className={styles.label}>Email</div>
              <input id = "email"value="johnsmith@gmail.com" className={styles.input} />
              <div className={styles.label}>Password</div>
              <button className={styles.button}>Change Password</button>
            </div>
            <div className={styles.close}>
              <h3>Close Account</h3>
              <button className={styles.password}>Delete your account</button>
            </div>
          </div>
        </div>
      </>
    );
};

export default Settings;
