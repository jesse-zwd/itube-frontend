import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from '../services/http'
import authHeader from "../services/header";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ previewUrl }) => {
  const videoRef = useRef(null); 

  const dispatch = useDispatch();
  const { id: videoId, url: src, thumb: poster } = useSelector(
    (state) => state.video.data
  );

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current);

    if (!previewUrl) {
      vjsPlayer.poster(poster);
      vjsPlayer.src(src);
    }

    if (previewUrl) {
      vjsPlayer.src({ type: "video/mp4", src: previewUrl });
    }

    vjsPlayer.on("ended", () => {
      http.post(`view/`, {video: videoId}, {headers: authHeader()})
    });

    return () => {
      if (vjsPlayer) {
        vjsPlayer.dispose();
      }
    };
  }, [videoId, dispatch, src, previewUrl, poster]);

  return (
    <div data-vjs-player>
      <video
        controls
        ref={videoRef}
        className="video-js vjs-fluid vjs-big-play-centered"
      ></video>
    </div>
  );
};

export default Player;
