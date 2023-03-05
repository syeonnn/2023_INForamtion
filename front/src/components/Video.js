// import React from 'react'
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { Col, Row } from 'antd';

// export default function Quiz() {

//     const [Videos, setVideos] = useState([])

//     useEffect(() => {
//         axios.get('http://localhost:4000/api/video/getVideos')
//             .then(response => {
//                 if (response.data.success) {
//                     console.log(response.data.videos)
//                     setVideos(response.data.videos)
//                 } else {
//                     alert('Failed to get Videos')
//                 }
//             })
//     }, [])


//     const renderCards = Videos.map((video, index) => {
//         return <Col lg={6} md={8} xs={24}>
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${video._id}`} >
//                 </a>
//             </div><br />
//             <span>{video.writer.name} </span><br />

//         </Col>
//     })

//     return (
//         <div className='learningspace'>

//             {/* <video controls loop muted autoPlay style={{padding: 100, width: 500, height: 400}}>
//                 <source src={video} type="video/mp4"/> 
//             </video> */}
//             <Row gutter={16}>
//                 {renderCards}
//             </Row>
//         </div>
//     )

// }
