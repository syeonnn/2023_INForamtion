import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function LearningMain(props) {

    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/video/getVideos")
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.videos);
                    setVideos(res.data.videos);
                } else {
                    alert('Failed to get Videos');
                }
            })
    }, []);

    const renderWords = Videos.map((video, index) => {
        const fileName = video.fileName.split(".")[0];

        return <div style={{ position: "relative" }}>
            <a href={`/learning/${fileName}`} id="renderWord">
                <p>{video.mean}</p>
            {/* <img  style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> */}
            </a>
        </div>
    }) 


    return (

        <section className="page-section bg-primary" id="intro">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="text-white mt-0">/learning 페이지</h2>
                    <hr className="divider divider-light" />
                    {renderWords}
                </div>
            </div>
        </div>
        </section>
    )
}

