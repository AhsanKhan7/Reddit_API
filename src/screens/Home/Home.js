import React from "react";
import styles from "./Home.module.scss";

const Home = ({ history }) => {
  const gotoMedia = () => {
    setTimeout(() => {
      history.push("/media");
    }, 700);
  };

  return (
    <div className={styles.home}>
      <button onClick={gotoMedia}>Derp me up</button>
    </div>
  );
};

export default Home;
