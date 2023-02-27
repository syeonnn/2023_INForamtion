import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'

export default function Learning(props) {

    const { videoId } = useParams();
    console.log(videoId);
    
    const [Video, setVideo] = useState([]);

    useEffect(async () => {
        await axios.post('http://localhost:4000/api/video/getVideo', {
                videoId: videoId
            })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.video);

                    // setVideo(res.data.video);
                } else {
                    alert('Failed to get video Info');
                }
            })
    }, []);

return (
  <div className="learningspace">

  </div>
)

}

//   <video style={{ width: '100%' }} src={`http://localhost:4000/${Video.filePath}`} controls></video>
