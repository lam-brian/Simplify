import styles from "./Home.module.css"
import Typing from "../../images/typing.png"
import Notes from "./Notes"
import Helmet from "react-helmet"

const Home = () => {

  return (
    <>
      <Helmet bodyAttributes={{ style: "background-color : #EDF3FE" }} />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.frame}>
            <div className={styles.welcome}>Welcome back, Brian</div>
            <div className={styles.start}>Let's start studying</div>
          </div>
          <img className={styles.typing} src={Typing} />
        </div>
      </div>
      <div className={styles.header}>Your notes</div>
      <div className={styles.cardFrame}>
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
      </div>
    </>
  );
}

export default Home;