import { useSelector } from "react-redux";
import AccountSettings from "../components/Account/AccountSettings";

const Settings = () => {
  const user = useSelector((state) => state.login.user);

  const { username, email } = user;

  return <AccountSettings username={username} email={email} />;
};

export default Settings;
