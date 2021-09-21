import React, { useState, useEffect } from "react";
import styles from "./Media.module.scss";
import defImage from "../../defImage/defImage.jpg";

import smallButton from "../../buttonImg/smallButton.png";
import smallButton2 from "../../buttonImg/smallButton2.png";

import axios from "axios";

const Media = () => {
  const [data, setData] = useState("");
  const [button, setButton] = useState(smallButton);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let subreddits = [
    "aww",
    "tippytaps",
    "animalsbeingderps",
    "rarepuppers",
    "happywoofgifs",
    "whatswrongwithyourdog",
    "petsareamazing",
  ];
  let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

  useEffect(() => {
    async function fetchData() {
      try {
        const fetch = await axios.get(
          `https://www.reddit.com/r/${subreddit}/random.json?limit=1`
        );
        setLoading(false);
        setData(fetch.data[0].data.children[0].data);
      } catch (err) {
        setError(true);
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);
  const changedata = async () => {
    setButton(smallButton2);
    window.location.reload();
  };

  return (
    <div className={styles.media}>
      <p>{data.title}</p>

      {error && <p>Something went wrong!</p>}
      {loading && <p>Loading</p>}

      <div className={styles.image}>
        {data?.url?.endsWith(`jpg` || `jpeg` || `png`) && (
          <img src={data.url} alt={data.subreddit} />
        )}

        {data.secure_media?.reddit_video?.hls_url && (
          <div className={styles.video}>
            <video autoPlay loop playsInline className={styles.video}>
              <source
                src={data.secure_media?.reddit_video?.hls_url}
                type="video/mp4"
              />
            </video>
          </div>
        )}

        {!data?.url?.endsWith(`jpg` || `jpeg` || `png`) &&
          !data.secure_media?.reddit_video?.hls_url &&
          data?.thumbnail?.endsWith(`jpg` || `jpeg` || `png`) && (
            <img src={data.thumbnail} alt={data.thumbnail} />
          )}

        {!data?.url?.endsWith(`jpg` || `jpeg` || `png`) &&
          !data.secure_media?.reddit_video?.hls_url &&
          !data?.thumbnail?.endsWith(`jpg` || `jpeg` || `png`) &&
          !loading && <img src={defImage} alt="pic" />}
      </div>

      <div className={styles.imagePlaceholder}>
        {data?.url?.endsWith(`jpg` || `jpeg` || `png`) && (
          <p>{data.subreddit}</p>
        )}
      </div>

      <div className={styles.button}>
        <button onClick={changedata}>
          <img src={button} alt="button" />
        </button>
      </div>
    </div>
  );
};

export default Media;
