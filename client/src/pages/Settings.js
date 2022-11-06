import { useSelector } from "react-redux";
import AccountSettings from "../components/Account/AccountSettings";

const Settings = () => {
  const user = useSelector((state) => state.login.user);

  const { username, email, id } = user;

  return <AccountSettings username={username} email={email} id={id} />;
};

export default Settings;
