import React, { useEffect, useReducer, useState } from "react";
import Page from "../Page";
import TaskModal from "./TaskModal";
import TaskModalContext from "../../contexts/TaskModalContext";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import Task from "./Task";
import TasksStateContext from "../../contexts/TasksStateContext";
import TasksDispatchContext from "../../contexts/TasksDispatchContext";

const ACTIONS = {
  addTask: "add_task",
  editTask: "edit_tasks",
  removeTask: "remove_task"
};

function Tasks() {
  const initialState = localStorage.getItem("reactTraining-user-tasks") ? JSON.parse(localStorage.getItem("reactTraining-user-tasks")) : [];
  const [tasks, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("reactTraining-user-tasks", JSON.stringify(tasks));
    console.log("User tasks:", tasks);
  }, [tasks]);

  function reducer(tasks, action) {
    switch (action.type) {
      case ACTIONS.addTask:
        return [...tasks, { id: Date.now(), name: action.value.name, desc: action.value.desc }];
      case ACTIONS.editTask:
        return [...tasks.map((task) => (task.id === action.value.id ? { id: action.value.id, name: action.value.name, desc: action.value.desc } : task))];
      case ACTIONS.removeTask:
        return tasks.filter((task) => task.id !== action.value);
      default:
        return tasks;
    }
  }

  const [modal, setModal] = useState();
  const [modalChildComponent, setModalChildComponent] = useState();

  return (
    <TasksStateContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <TaskModalContext.Provider value={{ setModal, setModalChildComponent }}>
          <Page title="My tasks">
            <section className="Section">
              <h2>My tasks</h2>
              <button
                className="Button Button--primary mt20"
                onClick={() => {
                  setModal(true);
                  setModalChildComponent({ name: "create_task" });
                }}
              >
                Create a new
              </button>
              <ul className="Tasks mt30">
                {tasks.map((task) => (
                  <Task key={task.id} id={task.id} name={task.name} desc={task.desc} />
                ))}
              </ul>
            </section>
          </Page>
          {modal && (
            <TaskModal>
              {modalChildComponent.name === "create_task" && <CreateTask />}
              {modalChildComponent.name === "edit_task" && <EditTask content={modalChildComponent.content} />}
            </TaskModal>
          )}
        </TaskModalContext.Provider>
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
}

export { ACTIONS };
export default Tasks;
