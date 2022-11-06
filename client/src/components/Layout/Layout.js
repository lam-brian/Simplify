import { useSelector } from "react-redux";

import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div className={isLoggedIn ? styles.container : ""}>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
export default Layout;
