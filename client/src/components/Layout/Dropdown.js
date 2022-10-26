import styles from './Dropdown.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { ReactComponent as UserIcon } from "../../images/icons/user.svg";
import { ReactComponent as LogOut } from "../../images/icons/logout.svg";

const Dropdown = () => {
      const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateSetting = () => {
        navigate('/setting')
    }
        const navigateSummarize = () => {
          dispatch(loginActions.logout())
            navigate("/summarize");
        };
    return (
      <div className={styles.menu}>
        <pre onClick={navigateSetting} className={styles.label}>
          <UserIcon className={styles.icon} />  Account setting
        </pre>
        <pre onClick={navigateSummarize} className={styles.label}>
          <LogOut className={styles.icon} />  Logout
        </pre>
      </div>
    );
}

export default Dropdown