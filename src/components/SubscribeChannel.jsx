import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

function SubscribeChannel() {
  const subscribedChannels =
    JSON.parse(localStorage.getItem("subscribedChannels")) || [];

  return (
    <>
       <div>
      <h2>Subscribed Channels</h2>
      <ul>
        {subscribedChannels.map((channelId) => (
          <li style={{color:"white"}}key={channelId}>{channelId}</li>
        ))}
      </ul>
    </div>
      
       
    </>
  );
}

export default SubscribeChannel;
