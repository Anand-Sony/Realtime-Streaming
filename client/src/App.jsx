import React, { useState } from 'react';
import { VideoPlayer } from "6pp";
import ReactPlayer from "react-player";
import './App.css'; 

const App = () => {
  const [quality, setQuality] = useState(480);

  return (
    
    <div className="video-container">

      {/* <VideoPlayer src="http://localhost:8000/video" setQuality={setQuality} ></VideoPlayer> */}

      <ReactPlayer url="http://localhost:8000/video" controls={true} width="100%" height="100%" />
    </div>
  );
};

export default App;