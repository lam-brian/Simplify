import { useSelector } from "react-redux";

import Header from "./Header";
import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isNoteMode = useSelector((state) => state.note.isNoteMode);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isLoggedIn && !isNoteMode && <MainNavigation />}
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};
export default Layout;
