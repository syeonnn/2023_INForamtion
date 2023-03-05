import React, { useRef, useEffect, useState } from "react";
import MediaPipeWebCam from "./MediaPipeWebcam";
import { io } from "socket.io-client";
import { Tooltip  } from 'react-tooltip';
import Loading from "./Loading";
import Modal from "./Modal";

import axios from 'axios';
import { useParams } from 'react-router-dom'


import {
StartButton,
  ModalButton,
  ModalButtonContainer,
  ToolTipContent,
} from "./index.style";

export const ALPHABET_LENGTH = 26;

const modalStyle = {
    width: "800px",
    height: "500px",
    display: "flex",
    "flex-direction": "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0",
  };


function Learning() {

  const [isLoading, setIsLoading] = useState(true);
  const [socketAnswer, setSocketAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
    modalVisible: false
  });
  const { videoId } = useParams();
  const [ Video, setVideo ] = useState([]);

  const [curSelectedButton, setCurSelectedButton] =
    useState({
      word: "",
      index: 0,
  });

  const lazyStartTimerId = useRef(null);
  //const [isLogin] = useAtom(loginAtom);
  //const [, setUser] = useAtom(userAtom);
 
  const handleClickButton = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        loadingModal: true,
        modalVisible: true
      };
    });

    // 2초 후 모달창 닫음.
    lazyStartTimerId.current = setTimeout(() => {
      //setCameraOn(true);
      setIsModalOpen((cur) => {
        return {
          ...cur,
          loadingModal: false,
          modalVisible: false
        };
      });
    }, 2000);
  };

  // socket에서 넘어온 데이터 중에 내가 최근 선택한 값이 들어있는지 확인
  const checkAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return answer.find((ans) => {
        return ans === curSelectedButton.word.toLowerCase();
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
    // 서버와 연결해서 학습용 비디오 불러옴
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
    //setCameraOn(false);
  };

  const openModal = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingAnswerModal: true,
        modalVisible: true
      };
    });
  };

  const closeModal = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        modalVisible: false,
      };
    });
  }

  const isCameraSettingOn = () => {
    if (isLoading === false) return;
    setIsLoading(false);
  };

  useEffect(() => {
    // 비디오 불러오기
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
                {/* <Modal visible={isModalOpen.loadingModal} style={modalStyle}> */}
                <Modal visible={isModalOpen.loadingModal && isModalOpen.modalVisible} style={modalStyle} onClose={closeModal}>
                    <img src="../../../assets/img/ai_loading.png" alt="ai가 켜지길 기다리는중" />
                </Modal>

                {/* <Modal visible={isModalOpen.correctModal} style={modalStyle}> */}
                <Modal visible={isModalOpen.correctModal && isModalOpen.modalVisible} style={modalStyle} onClose={closeModal}>
                    <img src="../../../assets/img/correct_answer.png" alt="로그인 유저가 정답인 경우!" />

                    <ModalButtonContainer>
                        <ModalButton
                            onClick={() => {
                                setIsModalOpen((cur) => {
                                    return {
                                        ...cur,
                                        correctModal: false,
                                        modalVisible: false
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
                                        modalVisible: false
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

                <Modal visible={isModalOpen.wrongModal} style={modalStyle} onClose={closeModal}>
                    <img src="../../../assets/img/wrong_answer.png" alt="오답인 경우!" />
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

                <Modal visible={isModalOpen.waitingAnswerModal} style={modalStyle} onClose={closeModal}>
                    {!socketAnswer && <img src="../../../assets/img/grading.png" alt="채점중인 로봇" />}
                </Modal>
            </>

            {isLoading && <Loading />}

            <div className="contents">
                <div className="columns">
                    <div className="column">
                        <article className="panel">
                            <p className="panel-heading">학습할 단어 넣을 자리</p>
                            <div className="panel-block">
                                {/* 비디오 출력 화면 */} 
                                <video style={{ width: '100%' }} src={`http://localhost:4000/api/video/detail?id=${Video.fileName}`} controls></video>
                                {/* <img src="../assets/img/bg-masthead.jpg" style={{ width: 200, height: 200 }}></img> */}
                            </div>
                            <p className="panel-footer">
                              {/* 단어&수형 설명 화면 */}
                              단어 :{Video.mean}<br />
                              수형 설명 :{Video.description}</p>
                        </article>
                    </div>
                    <div className="column">
                        <article className="panel" style={{ backgroundColor: "#D3D3D3", borderRadius: "0.8rem" }}>
                            <div className="panel-block">

                                <MediaPipeWebCam
                                    //cameraOn={cameraOn}
                                    //handleOffMediapipe={handleOffMediapipe}
                                    //isCameraSettingOn={isCameraSettingOn}
                                    handleSetSocketAnswer={handleSetSocketAnswer}
                                    openModal={openModal}
                                />
                                <StartButton
                                    onClick={handleClickButton}
                                    //cameraOn={cameraOn}
                                    data-tip="game-Guide"
                                    data-for="game-Guide"
                                >

                                    <Tooltip id="game-Guide">
                                        <ToolTipContent>
                                            <img
                                                src="../../../assets/img/playGuide.png"
                                                alt="playGuide"
                                                width="300"
                                            ></img>
                                            <p style={{ textAlign: "center", fontSize: "24px" }}>
                                                그림처럼 얼굴과 어깨와 손이 <br />
                                                함께 나오도록 자세를 잡아주세요
                                            </p>
                                        </ToolTipContent>
                                    </Tooltip>
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