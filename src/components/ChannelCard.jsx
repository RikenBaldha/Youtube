import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => {
  const [color, setcolor] = useState("white");
  const [flag, setFlag] = useState(0);
  

  const [msg, setMsg] = useState("UnSubScribe");

  useEffect(() => {
    const storedFlag = localStorage.getItem(`flag-${channelDetail?.id}`);
    if (storedFlag !== null) {
      setFlag(parseInt(storedFlag));
      setcolor(parseInt(storedFlag) === 1 ? "red" : "white");
      setMsg(parseInt(storedFlag) === 1 ? "Subscribe" : "UnSubscribe");
    }
  }, [channelDetail]);

  const addsubscribe = (e) => {
    e.preventDefault()
    const channelId = channelDetail?.id;
    const storedFlag = localStorage.getItem(`flag-${channelId}`);

    if (storedFlag === null || storedFlag === "0") {
        // If the channel is not subscribed, set it to 1 and update the localStorage
        setFlag(1);
        setcolor("red");
        setMsg("Subscribe"); // Changed from "Subscribe" to "UnSubscribe"
        localStorage.setItem(`flag-${channelId}`, 1);

        const subscribedChannels = JSON.parse(localStorage.getItem("subscribedChannels")) || [];
        if (!subscribedChannels.includes(channelDetail.snippet.title)) {
            subscribedChannels.push(channelDetail.snippet.title);
            localStorage.setItem("subscribedChannels", JSON.stringify(subscribedChannels));
        }
    } else {
        // If the channel is subscribed, toggle the flag and update the localStorage accordingly
        const newFlag = 1 - parseInt(storedFlag);
        setFlag(newFlag);
        setcolor(newFlag === 1 ? "red" : "white");
        setMsg(newFlag === 1 ? "Subscribe" : "UnSubscribe"); // Toggled between "UnSubscribe" and "Subscribe"
        localStorage.setItem(`flag-${channelId}`, newFlag);

        if (newFlag === 0) {
            const subscribedChannels = JSON.parse(localStorage.getItem("subscribedChannels")) || [];
            const updatedChannels = subscribedChannels.filter(id => id !== channelDetail.snippet.title);
            localStorage.setItem("subscribedChannels", JSON.stringify(updatedChannels));
        }
    }
};

  
  
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {channelDetail?.snippet?.title}{" "}
            <CheckCircleIcon
              sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
            />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography
              sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}
            >
              {parseInt(
                channelDetail?.statistics?.subscriberCount
              ).toLocaleString("en-US")}{" "}
              Subscribers
            </Typography>
          )}
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            <button
              style={{
                backgroundColor: `${color}`,
                marginTop: "5px",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={addsubscribe}
            >
              {msg}
            </button>
          </Typography>
        </CardContent>
      </Link>
    </Box>
  );
};
export default ChannelCard;
