import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./Video.module.css";
import Header from "../../layout/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoComponent from "../../components/VideoCom/VideoComponent";

function Video() {
  const cusID = JSON.parse(localStorage.getItem("user")).id;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [videoID, setVideoID] = useState(cusID);
  function setLikeDis(like, dislike){
    setVideoList((prevList) => {
      const newList = prevList.map((video, index) =>{
        if(index === currentVideoIndex ){
          if(like ==1)return {...video, TotalLike: video.TotalLike + like, TotalDislike: video.TotalDislike + dislike,LikeDis : "like"};
          else if(dislike ==1)return {...video, TotalLike: video.TotalLike + like, TotalDislike: video.TotalDislike + dislike,LikeDis : "dislike"};
          else return {...video, TotalLike: video.TotalLike + like, TotalDislike: video.TotalDislike + dislike,LikeDis : ""};
          
        }
        return video}
      );
      return [...newList];
    });
  };
  const handleNextVideo = (value) => {
    setCurrentVideoIndex(
      (prev) => (prev + value + videoList.length) % videoList.length
    );
  };
  useEffect(() => {
    fetchVideo();
  }, [videoID]);
  const fetchVideo = async () => {
    if (videoList.length === 0) {
      const res = await axios.post(
        "http://localhost:3001/api/video/getVideoByID",
        { videoID ,cusID}
      );
      setVideoList([...res.data[0], ...res.data[1]]);
    }
  };
  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/:videoID"
          element={
            <VideoComponent
              setVideoID={setVideoID}
              currentVideo={videoList[currentVideoIndex]}
              currentVideoIndex={currentVideoIndex}
              handleNextVideo={handleNextVideo}
              setLikeDis={setLikeDis}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Video;
