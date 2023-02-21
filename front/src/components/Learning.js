import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { Col, Row } from 'antd';


export default function Learning() {


  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  const [Videos, setVideos] = useState([{
    idx: '',
    mean: '',
    filePath: ''
  }])
  const [Video, setVideo] = useState([{
    idx: '',
    mean: '',
    filePath: ''
  }])


// const [wordList, setWordList] = useState(string[]);
// const [isLoading, setIsLoading] = useState(true);
// const [teachingVideo, setteachingVideo] = useState(true);

//

useEffect(() => {
  axios.get("http://localhost:4000/api/video/getVideos")
    .then(response => {
      if (response.data.success) {

        const data = response.data.videos
        console.log(JSON.stringify(data))
        setVideos(data)

        // const data = response.data.videos.map((index)=>({
        //   idx:index._id,
        //   mean:index.mean,
        //   filePath:index.filePath
        // }) )
      
        // const tempvideo = Videos.map((a,i)=>{
        //   key={i},
        //   setVideo(a)
        // })
        // var videodata = JSON.stringify(data)
        // console.log(videodata)

        // setVideos({videodata})
        // console.log(Videos[0])

      } else {
        alert('Failed to get Videos')
      }


      /*const inputvideo = Videos.map((index) => {
        id: index._id;
        mean: index.mean;
        filePath: index.filePath;
      })*/

    })
}, [])


// //서버로부터 영상 받아서 videos 에 저장
// const getVideo = async (localIsAlphabet: boolean) => {
//   const res = await Api.get("hands");
//   setVideos(res.data);

//   // const words: VideoDataProps[] = res.data.slice(
//   //   ALPHABET_LENGTH,
//   //   res.data.length
//   // );
//   const mappedWords = words.map((word) => {
//     return word.english;
//   });
//   setWordList(mappedWords);
// }

// // 특정단어 누르면
// const handleClickWord = () => {
//   navigate(`${pathname}/alphabet`);
// };



return (
  <div className="learningspace">

  {Videos.map(a,i) => {
    return(
      
    )
  }}

  </div>
)

}
