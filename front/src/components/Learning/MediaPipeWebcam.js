import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as h from "@mediapipe/holistic";
import {
    Holistic,
    POSE_LANDMARKS,
    POSE_CONNECTIONS,
    HAND_CONNECTIONS,
    FACEMESH_TESSELATION,
} from "@mediapipe/holistic";
import {
    drawConnectors,
    drawLandmarks
} from '@mediapipe/drawing_utils/drawing_utils';
import * as cam from "@mediapipe/camera_utils";
import { Socket, io } from "socket.io-client";
const flaskUrl = String(process.env.REACT_APP_FLASKPORT);

const holistic = new Holistic({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    }
});
holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

// function ServerToClientEvents(){

// }

// function ClientToServerEvents(){

// }

function MediaPipeWebcam({
    cameraOn,
    handleOffMediapipe,
    isCameraSettingOn,
    handleSetSocketAnswer,
    openModal,
}) {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    function answer(props){
        return(props)
    }
    function coordinate(props){
        return(props)
    }
        
    const [socket, setSocket] = useState(
        () => {
            const data = answer();
            return data;
        },
        () => {
            const hands = coordinate();
            return hands;
        }
    );
    const [mediapipeData, setMediapipeData] = useState([{
        poseLandmarks: h.NormalizedLandmarkList,
        leftHandLandmarks: h.NormalizedLandmarkList,
        rightHandLandmarks: h.NormalizedLandmarkList
    }]);
    const [Loading, setLoading] = useState(false);

    function onResults(results) {

        if (!canvasRef.current || !webcamRef.current?.video) {
            return;
        }

        const { poseLandmarks, leftHandLandmarks, rightHandLandmarks } = results;
        const data = {
        poseLandmarks,
        leftHandLandmarks,
        rightHandLandmarks,
        };

        setMediapipeData((cur) => {
        const temp = [...cur];
        temp.push(data);
        return temp;
        });

        canvasRef.current.width = webcamRef.current?.video.videoWidth;
        canvasRef.current.height = webcamRef.current?.video.videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        if (!canvasCtx) {
            return;
        }

        canvasCtx.save();

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = "source-in";
        canvasCtx.fillStyle = "#00FF00";
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

        canvasCtx.globalCompositeOperation = "destination-atop";
        canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );
        canvasCtx.globalCompositeOperation = "source-over";


        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 4 });
        drawLandmarks(canvasCtx, results.poseLandmarks,
            { color: '#FF0000', lineWidth: 2 });
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
            { color: '#C0C0C070', lineWidth: 1 });
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
            { color: '#CC0000', lineWidth: 5 });
        drawLandmarks(canvasCtx, results.leftHandLandmarks,
            { color: '#00FF00', lineWidth: 2 });
        drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
            { color: '#00CC00', lineWidth: 5 });
        drawLandmarks(canvasCtx, results.rightHandLandmarks,
            { color: '#FF0000', lineWidth: 2 });
    }

    const startRef = useRef();
    const middleRef = useRef();
    const endRef = useRef();

    useEffect(() => {
        if (mediapipeData.length === 50) {
          startRef.current = new Date();
          // 50개가 다 차면 정답을 기다리는 모달을 띄우기 위함
          openModal && openModal();
          socket?.emit("coordinate", mediapipeData);
          console.log("emiting...");
          middleRef.current = new Date();
    
          // handleOffMediapipe();
        }
      }, [mediapipeData, openModal]);

      useEffect(() => {
        holistic.onResults(onResults);
    });

    /*useEffect(() => {
        if (!isLoading) {
          isCameraSettingOn();
        }
      }, [isLoading]);*/

    useEffect(() => {

        let camera = cam.Camera;
        //let isCanceled = false;

        camera = new cam.Camera(webcamRef.current?.video, {
            onFrame: async () => {
                await holistic.send({ image: webcamRef.current?.video });
                if(Loading)
                    setLoading(true);
            },
            //width: 640,
            //height: 480,
        });

        camera.start();
    }, []);

    useEffect(() => {
        setSocket(io({ path: `${flaskUrl}/socket.io` }));
        return () => {
            console.log("disconnect socket");
            socket?.disconnect();
        };
    }, []);
    

    useEffect(() => {
       

        if (socket) {
            console.log("got socket");
          const func = (data) => {
            endRef.current = new Date();
            // 소켓 답변 매개변수로 넘겨주는 함수
            handleSetSocketAnswer && handleSetSocketAnswer(data);
          };
          // 소켓 답변 얻어오는 함수
          socket.on("answer", func);
          console.log("got answer");
    
          return () => {
            socket.off("answer", func);
          };
        }
      }, [socket, handleSetSocketAnswer]);
      
    return (
        <div className="videoContents">
            <Webcam
                ref={webcamRef}
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    zIndex: 3,
                    borderRadius: "0.8rem"
                }}
            />
            <canvas className="canvas" ref={canvasRef} style={{
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                zIndex: 9,
                borderRadius: "0.8rem"
            }} />
        </div>
    )
}

export default MediaPipeWebcam;

