import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [like, setLike] = useState(0);
  const [ld, setLd] = useState("white");
  const [flag, setFlag] = useState(0);
  const [msg, setMsg] = useState("Unliked");

  useEffect(() => {
    const storedLike = localStorage.getItem(`like-${id}`);
    const storedFlag = localStorage.getItem(`flag-${id}`);

    if (storedLike !== null && storedFlag !== null) {
      setLike(parseInt(storedLike));
      setFlag(parseInt(storedFlag));
      setLd(parseInt(storedFlag) === 1 ? "red" : "white");
      setMsg(parseInt(storedFlag) === 1 ? "Liked" : "Unliked");
    }

    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video`
    ).then((data) => setVideos(data.items));
  }, [id]);

  const addLike = () => {
    if (flag === 0) {
      setLike(like + 1);
      setFlag(1);
      setLd("red");
      setMsg("Liked");
      localStorage.setItem(`like-${id}`, like + 1);
      localStorage.setItem(`flag-${id}`, 1);
    } else {
      setLike(like - 1);
      setFlag(0);
      setLd("white");
      setMsg("Unliked");
      localStorage.setItem(`like-${id}`, like - 1);
      localStorage.setItem(`flag-${id}`, 0);
    }
  };

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, publishedAt },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              playing={true}
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  <button
                    style={{ backgroundColor: `${ld}` }}
                    onClick={addLike}
                  >
                    {msg}
                  </button>
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Time:-{publishedAt.slice(11, 19)} &nbsp; &nbsp; Date:-
                  {publishedAt.slice(0, 10)}
                  {/* Upload Time:- {publishedAt} */}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
