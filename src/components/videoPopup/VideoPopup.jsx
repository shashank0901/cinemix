import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  // when closebutton is clicked, called the hidePopup function which will set setShow = false and videoId = null, therefore the videoplayer will be removed and nothing plays now
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        {/* close the video player button */}
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        {/* ReactPlayer is a react library and has many good players, and it req these following components like url, controls(to play and pause), width and height */}
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          //   playing={true}  // if this is enabled then as soon as we click on the video popup, it will start to play
        />
      </div>
    </div>
  );
};

export default VideoPopup;
