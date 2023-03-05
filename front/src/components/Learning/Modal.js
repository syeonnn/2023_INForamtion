import React, { useEffect }  from "react";
import { ModalWrapper, ModalOverlay, ModalInner,ModalButton } from "./index.style";
import PropTypes from "prop-types";
import styled from 'styled-components'

function Modal({
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children,
}) {
      const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose(e);
        }
      }
    
      const close = (e) => {
        if (onClose) {
          onClose(e);
        }
      }
    
      useEffect(() => {
        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
        return () => {
          const scrollY = document.body.style.top
          document.body.style.cssText = `position: ""; top: "";`
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
      }, [])


  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        tabIndex={-1}
        visible={visible}
        onClick={maskClosable ? onMaskClick : null}
      >
         <ModalInner tabIndex={0} className="modal-inner">
          {closable && <ModalButton className="modal-close" onClick={close} />}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.defaultProps = {
    visible: false,
    closable: true,
    maskClosable: true,
  }

Modal.propTypes = {
  visible: PropTypes.bool,
};


export default Modal;