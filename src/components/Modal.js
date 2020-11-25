import React, { useContext } from "react";
import ModalContext from "../contexts/ModalContext";

function Modal(props) {
  const { setModal, setModalMessage, setModalComplexContent } = useContext(ModalContext);

  function clean() {
    setModal(false);
    setModalMessage("");
    setModalComplexContent(null);
  }

  return (
    <div className="Overlay">
      <div className="Modal">
        <div className="Modal-content center">
          {props.message && (
            <>
              <p className="Modal-text">{props.message}</p>
              <button className="Button Button--primary mt30" onClick={() => clean()}>
                Continue
              </button>
            </>
          )}
          {props.complexContent && props.complexContent}
        </div>
        <button className="Modal-close" type="button" onClick={() => clean()}></button>
      </div>
    </div>
  );
}

export default Modal;
