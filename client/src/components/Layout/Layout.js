import { useSelector } from "react-redux";

import Header from "./Header";
import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <>
      <Header />
      {isLoggedIn && <MainNavigation />}
      <main className={styles.main}>{children}</main>
    </>
  );
};
export default Layout;
