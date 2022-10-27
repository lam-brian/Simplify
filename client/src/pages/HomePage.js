import { useSelector } from "react-redux";
import Home from "../components/Notes/Home";

const HomePage = () => {
  const notes = useSelector((state) => state.note.notes);
  const user = useSelector((state) => state.login.user);

  return <Home notes={notes} user={user} />;
};

export default HomePage;
