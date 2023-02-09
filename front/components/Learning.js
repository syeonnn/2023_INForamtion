import React from 'react'
import { useEffect,useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const getWebcam = (callback) => {
  try {
    const constraints = {
      'video': true,
      'audio': false
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export default function Learning() {
  const [timer, setTimer] = useState(undefined);

  var video = document.querySelector("#videoElement");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    getWebcam((stream => {
      videoRef.current.srcObject = stream;
    }));
  }, []);

  /*
  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      if (ctx && ctx !== null) {
        if (videoRef.current) {
          // 화면 좌우반전
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          //ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.fillStyle = "white";
        ctx.fillRect(10, 10, 100, 50);
        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Ruben Choi", 15, 30);
      }
    } catch (err) {
      console.log(err);
    }
  }*/

  return (

    <div className="learningspace">

        <table>
          <tbody>
            <tr>
              <td><video ref={videoRef} autoPlay style={{
                position: "absolute",
                bottom: 100,
                left: 680,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                zIndex: 3,
                width: 400,
                height: 300,
                border: '2px solid black',
              }} /></td>
              
            </tr>
          </tbody>
        </table>      

    </div>
  )
}

/*<td><video ref={videoRef} autoPlay style={{
  position: "absolute",
  bottom: 115,
  left: 240,
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
  zIndex: 3,
  width: 400,
  height: 300,
}} /></td>

위치!
*/