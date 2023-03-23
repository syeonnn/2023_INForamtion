import styled, { css } from "styled-components";

export const StartButton = styled.div`
  z-index: 9;
  width: 10rem;
  height: 7rem;
  border-radius: 1.5rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${(props) => (props.cameraOn ? "auto" : "pointer")};
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.cameraOn ? 0 : 1)};
`;

export const StartTriangle = styled.div`
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  border-left: 30px solid white;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.cameraOn ? 0 : 1)};
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  width: 400px;
  background-color: white;
  padding: 5px 0 5px 0;
`;

export const ModalButton = styled.div`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  color: #3a86ff;
`;


export const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

export const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

export const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`
