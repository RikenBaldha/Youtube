import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Select, MenuItem } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [sortBy, setSortBy] = useState(''); // Default to empty string

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortVideos = (sortBy) => {
    if (sortBy === 'Date') {
      if (videos) {
        const sorted = [...videos].sort((a, b) => {
          const dateA = new Date(a.snippet.publishedAt);
          const dateB = new Date(b.snippet.publishedAt);
          return dateB - dateA; // to sort in descending order
        });
        setVideos(sorted);
      }
    } else if (sortBy === '') {
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
        setVideos(data.items);
      });
    }
    // Add other sorting options as needed
  };

  useEffect(() => {
    fetchFromAPI(`search?part=statistics&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    sortVideos(sortBy);
  }, [sortBy, selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2022 JSM Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Box sx={{ height: "30px" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              style={{ color: 'white',backgroundColor:'gray', marginLeft: "10px" }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Date">Latest</MenuItem>
              {/* Add other sorting options here */}
            </Select>
          </Typography>
        </Box>

        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  );
};

export default Feed;
