import React, { useContext } from "react";
import TaskModalContext from "../../contexts/TaskModalContext";

function TaskModal(props) {
  const { setModal, setModalChildComponent } = useContext(TaskModalContext);

  return (
    <div className="Overlay">
      <div className="Modal">
        <div className="Modal-content center">
          {props.children}
          <button
            className="Modal-close"
            type="button"
            onClick={() => {
              setModal(false);
              setModalChildComponent();
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
