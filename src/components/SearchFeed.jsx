// import { useState, useEffect } from "react";
// import { Typography, Box } from "@mui/material";
// import { useParams } from "react-router-dom";

// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import { Videos } from "./";

// const SearchFeed = () => {
//   const [videos, setVideos] = useState(null);
//   const { searchTerm } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
//       .then((data) => setVideos(data.items))
//   }, [searchTerm]);

//   return (
//     <Box p={2} minHeight="95vh">

//       <Box height="100px"  >
//       <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
//         Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
//       </Typography>
//       <button style={{float:'right' , marginRight:'10px'}}>Sort By Date</button>
//       </Box>
  
//       <Box display="flex" marginTop="10px">
//         <Box sx={{ mr: { sm: '100px' } }}/>
//         {<Videos videos={videos} />}
//       </Box>
//     </Box>
//   );
// };

// export default SearchFeed;

import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [sortedVideos, setSortedVideos] = useState(null); // state for sorted videos
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
      setSortedVideos(data.items); // Initialize sortedVideos with fetched data
    });
  }, [searchTerm]);

  const sortByDate = () => {
    const sorted = [...sortedVideos].sort((a, b) => {
      const dateA = new Date(a.snippet.publishedAt);
      const dateB = new Date(b.snippet.publishedAt);
      return dateB - dateA; // to sort in descending order
    });
    setSortedVideos(sorted);
  };

  const sortByViews = () => {
    const sorted = [...sortedVideos].sort((a, b) => {
      return b.statistics.viewCount - a.statistics.viewCount; // to sort in descending order
    });
    setSortedVideos(sorted);
  };

  return (
    <Box p={2} minHeight="95vh">
      <Box height="100px">
        <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
          Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
        </Typography>
        <button style={{ float: "right", marginRight: "10px" }} onClick={sortByDate}>
          Sort By Date
        </button>
        <button style={{ float: "right", marginRight: "10px" }} onClick={sortByViews}>
          Sort By Views
        </button>
      </Box>

      <Box display="flex" marginTop="10px">
        <Box sx={{ mr: { sm: "100px" } }} />
        {<Videos videos={sortedVideos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
