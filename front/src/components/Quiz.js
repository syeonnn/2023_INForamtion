// import React from 'react'
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// export default function Quiz() {

//     const [Videos, setVideos] = useState([{
//         idx: '',
//         mean: '',
//         filePath:''
//     }])

//     useEffect(() => {
//         axios.get("http://localhost:4000/api/video/getVideos")
//             .then(response => {

//                 // const inputVideo = response.data.map((index) => {
//                 //      id: index._id;
//                 //      mean: index.mean;
//                 //      filePath: index.filePath;
//                 // })
//                 // setVideos(Videos.concat(inputVideo))

//                 // console.log(Videos)

//                 if (response.data.success) {
//                     console.log(response.data.videos)
//                     setVideos(response.data.videos)
//                 } else {
//                     alert('Failed to get Videos')
//                 }
//             })
//     }, [])


//     // const renderCards = Videos.map((video, index) => {
//     //     return <Col lg={6} md={8} xs={24}>
//     //         <div style={{ position: 'relative' }}>
//     //             <a href={`/video/${video._id}`} >
//     //             </a>
//     //         </div><br />
//     //         <span>{video.mean} </span><br />

//     //     </Col>
//     // })

//     return (
//         <div className='quizspace'>

//             {/* <video controls loop muted autoPlay style={{padding: 100, width: 500, height: 400}}>
//                 <source src={video} type="video/mp4"/> 
//             </video> */}
//             {/* <Row gutter={16}>
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${Videos[0]}`} >
//                 </a>
//             </div><br />
            
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${Videos[1]}`} >
//                 </a>
//             </div><br />
            
//             </Row> */}
//         </div>
//     )

// }