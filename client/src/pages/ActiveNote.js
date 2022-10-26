import SelectedNote from "../components/Notes/SelectedNote";

const DUMMY_KEYWORDS = [
  {
    word: "apple",
    definition:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt nemo eos vero culpa nihil impedit itaque perferendis modi autem ducimus incidunt id nisi dolores laudantium quia, iusto aliquid dignissimos omnis.",
  },
  {
    word: "banana",
    definition:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt nemo eos vero culpa nihil impedit itaque perferendis modi autem ducimus incidunt id nisi dolores laudantium quia, iusto aliquid dignissimos omnis.",
  },
  {
    word: "highlight",
    definition:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt nemo eos vero culpa nihil impedit itaque perferendis modi autem ducimus incidunt id nisi dolores laudantium quia, iusto aliquid dignissimos omnis.",
  },
];

const ActiveNote = () => {
  return (
    <SelectedNote
      title="Pschology 101 Cards"
      summary={
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt nemo eos vero culpa nihil impedit itaque perferendis modi autem ducimus incidunt id nisi dolores laudantium quia, iusto aliquid dignissimos omnis."
      }
      keywords={DUMMY_KEYWORDS}
    />
  );
};

export default ActiveNote;
