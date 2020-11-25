import React, { useContext, useState } from "react";
import { ACTIONS } from "./Tasks";
import TasksStateContext from "../../contexts/TasksStateContext";
import TasksDispatchContext from "../../contexts/TasksDispatchContext";
import TaskModalContext from "../../contexts/TaskModalContext";

function EditTask(props) {
  const tasksState = useContext(TasksStateContext);
  const tasksDispatch = useContext(TasksDispatchContext);
  const { setModal } = useContext(TaskModalContext);

  console.log("Imported TasksState:", tasksState);

  const [name, setName] = useState(props.content.name);
  const [desc, setDesc] = useState(props.content.desc);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO Validate the form
    console.log("The edited task data:", props.content);
    tasksDispatch({ type: ACTIONS.editTask, value: { id: props.content.id, name: name, desc: desc } });
    setModal(false);
  }

  return (
    <section className="Section">
      <h3>Edit task id {props.content.id}</h3>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <div className="Form-row">
          <label htmlFor="name" className="Form-label block ta-left mb5">
            Name
          </label>
          <input id="name" name="name" className="Form-input w100p" type="text" autoComplete="off" defaultValue={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="Form-row">
          <label htmlFor="desc" className="Form-label block ta-left mb5">
            Description
          </label>
          <textarea className="Form-textarea w100p" type="text" rows="3" id="desc" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <button type="submit" className="Button Button--primary w100p mt20">
          Save
        </button>
      </form>
    </section>
  );
}

export default EditTask;
