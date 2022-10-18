import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </>
  );
};
export default Layout;
