/*import React, { useEffect, useRef, useState } from "react";
import {
  StartButton,
  StartTriangle,
  ModalButton,
  ModalButtonContainer,
  ToolTipContent,
} from "./index.style";
import { useLocation } from "react-router";
import * as Api from "../../../../api";
import ButtonList from "./buttonList/ButtonList";
import MediaPipeWebCam from "../../../MediaPipeWebCam";
import Loading from "../../../Loading";
import Modal from "../../Modal";
import { learningGamecopyRights } from "../../../copyRights/copyRights";
import { imgSrc } from "../learningData";
import ReactTooltip from "react-tooltip";
import ai_loading from "../../../../assets/img/ai_loading.png";
import grading from "../../../../assets/img/grading.png";
import correct_answer from "../../../../assets/img/correct_answer.png";
import wrong_answer from "../../../../assets/img/wrong_answer.png";
import playGuide from "../../../../assets/img/playGuide.";
import { useAtom } from "jotai";
import { loginAtom, userAtom } from "../../../../state";

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

const tempLearning = () => {
  //const { pathname } = useLocation();
  //const [cameraOn, setCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socketAnswer, setSocketAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    loadingModal: false,
    waitingAnswerModal: false,
    correctModal: false,
    wrongModal: false,
  });

  const lazyStartTimerId = useRef(null);
  //const [isLogin] = useAtom(loginAtom);
  //const [, setUser] = useAtom(userAtom);
 
  const handleClickButton = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        loadingModal: true,
      };
    });

    // 2초 후 모달창 닫음.
    lazyStartTimerId.current = setTimeout(() => {
      //setCameraOn(true);
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
  };

  const handleOffMediapipe = () => {
    //setCameraOn(false);
  };
  const openModal = () => {
    setIsModalOpen((cur) => {
      return {
        ...cur,
        waitingAnswerModal: true,
      };
    });
  };
  const isCameraSettingOn = () => {
    if (isLoading === false) return;
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (lazyStartTimerId !== null) {
        clearTimeout(lazyStartTimerId.current);
      }
    };
  }, []);


  return (
    <>
      <Modal visible={isModalOpen.loadingModal} style={modalStyle}>
        <img src={ai_loading} alt="ai가 켜지길 기다리는중" />
      </Modal>

      <Modal visible={isModalOpen.correctModal} style={modalStyle}>
        <img src={correct_answer} alt="로그인 유저가 정답인 경우!" />

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
        <img src={wrong_answer} alt="오답인 경우!" />
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
        {!socketAnswer && <img src={grading} alt="채점중인 로봇" />}
      </Modal>

      {isLoading && <Loading />}
     

              <MediaPipeWebCam
                //cameraOn={cameraOn}
                //handleOffMediapipe={handleOffMediapipe}
                //isCameraSettingOn={isCameraSettingOn}
                handleSetSocketAnswer={handleSetSocketAnswer}
                openModal={openModal}
              />
             
                <Button
                  onClick={handleClickButton}
                  //cameraOn={cameraOn}
                  data-tip="game-Guide"
                  data-for="game-Guide"
                >

                  <ReactTooltip id="game-Guide">
                    <ToolTipContent>
                      <img
                        src={playGuide}
                        alt="playGuide"
                        width="300"
                      ></img>
                      <p style={{ textAlign: "center", fontSize: "24px" }}>
                        그림처럼 얼굴과 어깨와 손이 <br />
                        함께 나오도록 자세를 잡아주세요
                      </p>
                    </ToolTipContent>
                  </ReactTooltip>
                </Button>
    </>
  );
};
*/


// <StartTriangle cameraOn={cameraOn} />