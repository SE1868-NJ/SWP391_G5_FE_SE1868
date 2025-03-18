import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "./Video.module.css";
import Header from "../../layout/Header/Header";

function Video() {
  const playerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const handleNextVideo = (value) => {
    setCurrentVideo(
      (prev) => (prev + value + videoList.length) % videoList.length
    );
  };
  const videoList = [
    {
      id: 1,
      url: "https://res.cloudinary.com/div6eqrog/video/upload/v1741752754/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1_yqxxt6.mp4",
      title: "Video 1",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/div6eqrog/video/upload/v1741752528/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_lhfgvz.mp4",
      title: "Video 2",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/div6eqrog/video/upload/v1741752239/video1_elqek5.mp4",
      title: "Video 3",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => handleVideo(e);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  async function handleVideo(e) {
    switch (e.key) {
      case "ArrowUp":
        handleNextVideo(1);
        break;
      case "ArrowDown":
        handleNextVideo(-1);
        break;
      case "ArrowRight":
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() + 5,
          "seconds"
        );
        break;
      case "ArrowLeft":
        playerRef.current.seekTo(
          playerRef.current.getCurrentTime() - 5,
          "seconds"
        );
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Header></Header>
      <div className={styles.videoContainer}>
        <div className={styles.videoInner}>
          <div className={styles.changeVideo}>
          <button className={`${currentVideo === 0 ? styles.hidden : ''} ${styles.arowTop}`} onClick={()=>handleNextVideo(-1)} ><img alt="" src="/arowbottom.png" /></button>
            <button  onClick={()=>handleNextVideo(1)} ><img alt="" src="/arowbottom.png" /></button>
          </div>
          <div className={styles.video}>
            <ReactPlayer
              ref={playerRef}
              url={videoList[currentVideo].url}
              loop
              playing
              muted
              controls
              height="85vh"
              width="47,81vh"
            />
          </div>
          <div className={styles.functionVideo}>
            <div>
              <button ><img alt="" src="/likeIcon.png" /></button>
              0
            </div>
            <div>
              <button ><img alt="" src="/dislikeIcon.png" /></button>
              0
            </div>
            <div>
              <button ><img alt="" src="/cmtIcon.png" /></button>
              0
            </div>
            <div>
              <button ><img alt="" src="/shareIcon.png" /></button>
              Share
            </div>
            <div>
              <button ><img alt="" src="/reportIcon1.png" /></button>
              Report
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
