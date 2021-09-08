import React, { useState, useEffect } from "react";
import styles from "./Media.module.scss";
import defImage from "../../defImage/defImage.jpg";
import ReactHlsPlayer from "react-hls-player";
import axios from "axios";

const Media = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let subreddits = [
    "aww",
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
    window.location.reload();
  };

  console.log(data);

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
            <ReactHlsPlayer
              className={styles.player}
              src={data.secure_media?.reddit_video?.hls_url}
              autoPlay={true}
              controls={true}
              muted={true}
              width="100%"
              height="auto"
            />
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
        <button onClick={changedata}>More Derp</button>
      </div>
    </div>
  );
};

export default Media;
