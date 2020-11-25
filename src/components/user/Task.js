import React, { useContext } from "react";
import { ACTIONS } from "./Tasks";
import TasksDispatchContext from "../../contexts/TasksDispatchContext";
import TaskModalContext from "../../contexts/TaskModalContext";

function Task(props) {
  const tasksDispatch = useContext(TasksDispatchContext);
  const { setModal, setModalChildComponent } = useContext(TaskModalContext);

  return (
    <li className="Task">
      <div className="Task-textContainer">
        <h4 className="Task-heading">{props.name}</h4>
        <p className="Task-text">{props.desc}</p>
      </div>
      <div className="Task-buttonContainer">
        <button
          className="Button Button--small Button--secondary"
          onClick={() => {
            setModal(true);
            setModalChildComponent({ name: "edit_task", content: props });
          }}
        >
          Edit
        </button>
        <button className="Button Button--small Button--danger" onClick={() => tasksDispatch({ type: ACTIONS.removeTask, value: props.id })}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Task;
