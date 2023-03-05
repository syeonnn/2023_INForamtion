import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'

export default function Learning(props) {

    const { videoId } = useParams();
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        // axios.post('http://localhost:4000/api/video/getVideo', {
        axios.post('/api/video/getVideo', {
                videoId: videoId
            })
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.video);
                    setVideo(res.data.video);
                } else {
                    alert('Failed to get video Info');
                }
            })
    }, []);

    if (Video.fileName) {
        return (
            <div>
                <div className="learningspace" style={{width:"400px", height:"400px", float:"left"}}>
                    <video style={{ width: '100%' }} src={`http://localhost:4000/api/video/detail?id=${Video.fileName}`} controls></video>
                    {/* <video style={{ width: '100%' }} src={`/api/resource/${Video.fileName}`} controls></video> */}
                </div>
                <div className="cameraspace" style={{width:"400px", height:"400px", float:"left"}}>
                    <video style={{ width: '100%' }} src={`http://localhost:4000/api/video/detail?id=${Video.fileName}`} controls></video>
                    {/* <video style={{ width: '100%' }} src={`/api/resource/${Video.fileName}`} controls></video> */}
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

//   <video style={{ width: '100%' }} src={`http://localhost:4000/${Video.filePath}`} controls></video>
