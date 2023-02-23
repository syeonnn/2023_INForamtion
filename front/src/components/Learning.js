import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'

export default function Learning(props) {

  const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

return (
  <div className="learningspace">

  

  </div>
)

}

//   <video style={{ width: '100%' }} src={`http://localhost:4000/${Video.filePath}`} controls></video>
