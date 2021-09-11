import React, { useState } from "react";
import styles from "./Home.module.scss";

import buttonPic from "../../buttonImg/buttonPic.png";
import buttonPic2 from "../../buttonImg/buttonPic2.png";

const Home = ({ history }) => {
  const [button, setButton] = useState(buttonPic);

  const gotoMedia = () => {
    setButton(buttonPic2);
    setTimeout(() => {
      history.push("/media");
    }, 700);
  };

  return (
    <div className={styles.home}>
      <button onClick={gotoMedia}>
        <img src={button} alt="button" />
      </button>
    </div>
  );
};

export default Home;
