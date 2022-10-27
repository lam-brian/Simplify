import { useSelector } from "react-redux";
import Home from "../components/Notes/Home";

const HomePage = () => {
  const notes = useSelector((state) => state.note.notes);

  return <Home notes={notes} user={"Brian"} />;
};

export default HomePage;
