import { useSelector } from "react-redux";

import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isNoteMode = useSelector((state) => state.note.isNoteMode);

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        {isLoggedIn && !isNoteMode && <MainNavigation />}
        <main className={styles.main} style={{ marginTop: "5.6rem" }}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </>
  );
};
export default Layout;
