import React, { useState, useEffect } from "react";
import styles from "./Media.module.scss";
import defImage from "../../defImage/defImage.jpg";

import smallButton from "../../buttonImg/smallButton.png";
import smallButton2 from "../../buttonImg/smallButton2.png";

import ReactHlsPlayer from "react-hls-player";
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
            <ReactHlsPlayer
              className={styles.player}
              src={data.secure_media?.reddit_video?.hls_url}
              autoPlay={false}
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
        <button onClick={changedata}>
          <img src={button} alt="button" />
        </button>
      </div>
    </div>
  );
};

export default Media;

// const fallBack =
//   "https://v.redd.it/kutyumqf2uo61/DASH_720.mp4?source=fallback";
// const dash =
//   "https://v.redd.it/kutyumqf2uo61/DASHPlaylist.mpd?a=1634287431%2CZTQyMWMxMmY2NTAzMTFhMjI3MmQ1YWVmYTI1N2MyMTcxMmVhZjEyMGRlZDE1ZGQyMzZiMWIxZTJmODc2YTYzZg%3D%3D&amp;v=1&amp;f=sd";
// const hls =
//   "https://v.redd.it/kutyumqf2uo61/HLSPlaylist.m3u8?a=1634287431%2CYmI0YTUxZDI3NGE4YjYzOGYzMjUyZWRjZWUyY2YxNmMyN2VlMWJkMmIxZDE5NDVmNDNmYTAyNmQxNWI0MzBkNw%3D%3D&amp;v=1&amp;f=sd";
// const scrubble = "https://v.redd.it/kutyumqf2uo61/DASH_96.mp4";
