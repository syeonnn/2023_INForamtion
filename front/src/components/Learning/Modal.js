import React from "react";
import { ModalWrapper, ModalOverlay, ModalInner } from "./index.style";
import PropTypes from "prop-types";

function Modal({
  className,
  visible,
  children,
  closeModal,
  style,
  backGroundTransparent,
}) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        tabIndex={-1}
        visible={visible}
        onClick={closeModal && closeModal}
      >
        <ModalInner
          tabIndex={0}
          className={className}
          visible={visible}
          style={style}
          backGroundTransparent={backGroundTransparent && backGroundTransparent}
        >
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

export default Modal;