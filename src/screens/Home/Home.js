import React from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home}>
      <Link to="/media">
        <button>Derp me up</button>
      </Link>
    </div>
  );
};

export default Home;
