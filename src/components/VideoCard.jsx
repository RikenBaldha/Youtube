import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
    statistics,
  },
}) => {
  const viewCount = statistics?.viewCount || "N/A";
  return (
    <Card
      className="card"
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="white">
          {viewCount} views
        </Typography>
        {snippet.publishTime ? (
          <h4 style={{ color: "white" }}>
            Time:-{snippet.publishTime.slice(11, 19)} &nbsp; &nbsp; Date:-
            {snippet.publishTime.slice(0, 10)}
          </h4>
        ) : (
          <h4 style={{ color: "white" }}>Time:- Unknown</h4>
        )}
        {/* <h4 style={{color:"white"}}>Date:-{snippet.publishTime.slice(0,9)}</h4> */}
        {/* <h4 style={{color:"white"}}>{viewCount}</h4>   */}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
