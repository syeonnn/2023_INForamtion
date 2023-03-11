import React, { useRef, useEffect, useState } from "react";
import MediaPipeWebCam from "./MediaPipeWebcam";
import { io } from "socket.io-client";
import { Tooltip } from 'react-tooltip';
import Loading from "./Loading";
import Modal from "./Modal";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

import {
  StartButton,
  StartTriangle,
  ModalButton,
  ModalButtonContainer,
  ToolTipContent,
} from "./index.style";

export const ALPHABET_LENGTH = 26;

const modalStyle = {
  width: "800px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0",
};

function Learning() {
  //const { pathname } = useLocation();
  const [isLearningPage, setIsLearningPage] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socketAnswer, setSocketAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
  });
  const [curSelected, setCurSelected] = useState("");

  const [curSelectedButton, setCurSelectedButton] =
    useState({
      word: "",
      index: 0,
  });

  const lazyStartTimerId = useRef(null);
  //const [isLogin] = useAtom(loginAtom);
  //const [, setUser] = useAtom(userAtom);

  const { videoId } = useParams();
  const [ Video, setVideo ] = useState([]);
  const navigate = useNavigate();  
 
  const handleClickButton = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        loadingModal: true,
      };
    });

    // 2초 후 모달창 닫음.
    lazyStartTimerId.current = setTimeout(() => {
      setCameraOn(true);
      setIsModalOpen((cur) => {
        return {
          ...cur,
          loadingModal: false,
        };
      });
    }, 2000);
  };

  // socket에서 넘어온 데이터 중에 내가 최근 선택한 값이 들어있는지 확인
  const checkAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return answer.find((ans) => {
        return ans === curSelected.toLowerCase();
      });
    }
  };

  // socket에서 보내온 응답을 저장한다. ["a", "b", "c"]
  const handleSetSocketAnswer = (answer) => {
    setSocketAnswer(answer);
    if (checkAnswer(answer) !== undefined) {
      setIsModalOpen((cur) => {
        return {
          ...cur,
          waitingAnswerModal: false,
          correctModal: true,
        };
      });
    } else {
      setIsModalOpen((cur) => {
        return {
          ...cur,
          waitingAnswerModal: false,
          wrongModal: true,
        };
      });
    }
  };

  const getVideos = async () => {
    // videoId 가  null인 경우 -> learning/:id=?? 로 redirect 를 해줘야함 

    axios.post('/api/video/getVideo', {
      videoId: videoId
    })
    .then((res) => {
        if (res.data.success) {
            console.log(res.data.video);
            setVideo(res.data.video);
        } else {
            alert('Failed to get video Info');
        }
    });
  };

  const handleOffMediapipe = () => {
    setCameraOn(false);
  };

  const openModal = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingAnswerModal: true,
      };
    });
  };

  // const handleSetCurSelectedButton = (data) => {
  //   setCurSelectedButton(data);
  // };

  // const handleSetSelected = (props) => {
  //   const video_id = props.match.params.videoId;
  //   setCurSelected(video_id)
  // }

  // useEffect(() => {
  //   try {
  //     //const localIsAlphabet = pathname.includes("alphabet") === true;
  //     //getVideos(localIsAlphabet);
  //     // setIsLearningPage(true);
  //     //   setCurSelected({
  //     //     word: "hi",
  //     //     index: 0,
  //     //   });

      
  //     setCurSelected(video_id)
  //     console.log({ video_id });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }, []);


  const isCameraSettingOn = () => {
    if (isLoading === false) return;
    setIsLoading(false);
  };

  

  useEffect(() => {
    // video Id 가 undefined 일 경우 -> learning/hi 로 리다이렉트
    // 문제) 하드 코딩, 새로고침을 하지 않으면 영상 업로드가 안됨
    // if (!videoId) {
    //   console.log("video id is Null");
    //   return navigate("/learning/hi");
    // } else {
    //   console.log("video id is not Null");
    //   getVideos();
   
    //   return () => {
    //     if (lazyStartTimerId !== null) {
    //       clearTimeout(lazyStartTimerId.current);
    //     }
    //   };
    // }

    getVideos();

    return () => {
      if (lazyStartTimerId !== null) {
        clearTimeout(lazyStartTimerId.current);
      }
    };
  }, []);


  return (

    <div className="learningspace">
      <>
        <Modal visible={isModalOpen.loadingModal} style={modalStyle}>
          <h3 className="text-primary fw-bold mb-4">카메라를 찾는 중···</h3>
          <img src="../../../assets/img/ai_loading.png" alt="ai가 켜지길 기다리는중" width="240px" />
        </Modal>

        <Modal visible={isModalOpen.correctModal} style={modalStyle}>
          <h3 className="text-dark fw-bold mb-3">정답입니다!</h3>
          <img src="../../../assets/img/correct_answer.jpg" alt="정답인 경우!" width="260px" />

          <ModalButtonContainer>
            <ModalButton
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    correctModal: false,
                  };
                });
                setSocketAnswer(undefined);
              }}
            >
              닫기
            </ModalButton>
            <ModalButton
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    correctModal: false,
                  };
                });
                setSocketAnswer(undefined);
                handleClickButton();
              }}
            >
              다시하기
            </ModalButton>
          </ModalButtonContainer>
        </Modal>

        <Modal visible={isModalOpen.wrongModal} style={modalStyle}>
          <h3 className="text-dark fw-bold mb-3">다시 한 번 해보세요.</h3>
          <img src="../../../assets/img/wrong_answer.jpg" alt="오답인 경우!" width="260px"/>
          <div className="ModalButtonContainer">
            <ModalButton
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    wrongModal: false,
                  };
                });
                setSocketAnswer(undefined);
              }}
            >
              닫기
            </ModalButton>
            <ModalButton
              onClick={() => {
                setIsModalOpen((cur) => {
                  return {
                    ...cur,
                    wrongModal: false,
                  };
                });
                setSocketAnswer(undefined);
                handleClickButton();
              }}
            >
              다시하기
            </ModalButton>
          </div>
        </Modal>

        <Modal visible={isModalOpen.waitingAnswerModal} style={modalStyle}>
          <h3 className="text-success fw-bold mb-3">채점 중입니다!</h3>
          {!socketAnswer && <img src="../../../assets/img/grading.jpg" alt="채점중인 로봇" width="340px"/>}
        </Modal>
      </>

      {isLoading && <Loading />}


      <div className="contents">
        <div className="columns">
          <div className="column">
            <article className="panel">
              <p className="panel-heading">
                단어 :{Video.mean}
              </p>
              <div className="panel-block">
                  {/* 비디오 출력 화면 */} 
                  <video style={{ width: '100%' }} src={`http://localhost:4000/api/video/detail?id=${Video.fileName}`} controls></video>
                  {/* <img src="../assets/img/bg-masthead.jpg" style={{ width: 200, height: 200 }}></img> */}
              </div>
                  {/* 단어&수형 설명 화면 */}
                  <p className="panel-footer" >
                    단어 :{Video.mean}</p>
                  <p className="panel-footer" >
                    수형 설명 :{Video.description}</p>
                  <p className="panel-footer">
                    출처: 국립 국어원 한국 수어 사전</p>
              </article>
          </div>
          <div className="column">
            <article className="panel" style={{ backgroundColor: "#11264f", borderRadius: "0.8rem" }}>
              <div className="panel-block-right" >
                <MediaPipeWebCam
                  cameraOn={cameraOn}
                  handleOffMediapipe={handleOffMediapipe}
                  isCameraSettingOn={isCameraSettingOn}
                  handleSetSocketAnswer={handleSetSocketAnswer}
                  openModal={openModal}
                />
                <StartButton
                  onClick={handleClickButton}
                  cameraOn={cameraOn}
                  data-tip="game-Guide"
                  data-for="game-Guide"
                >
                  <StartTriangle cameraOn={cameraOn} />
                </StartButton>

              </div>
            </article>
          </div>
        </div>
      </div>

        </div>
    )
}

export default Learning;