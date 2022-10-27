import { useSelector } from "react-redux";
import Settings from "../components/Account/Settings";

const Setting = () => {
  const user = useSelector((state) => state.login.user);

  const { username, email } = user;

  return <Settings username={username} email={email} />;
};

export default Setting;
