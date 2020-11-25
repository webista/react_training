import React, { useContext, useState } from "react";
import { ACTIONS } from "./Tasks";
import TasksDispatchContext from "../../contexts/TasksDispatchContext";
import TaskModalContext from "../../contexts/TaskModalContext";

function CreateTask() {
  const tasksDispatch = useContext(TasksDispatchContext);
  const { setModal } = useContext(TaskModalContext);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO Validate the form
    tasksDispatch({ type: ACTIONS.addTask, value: { name: name, desc: desc } });
    setName("");
    setDesc("");
    setModal(false);
  }

  return (
    <section className="Section">
      <h3>Create a new task</h3>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <div className="Form-row">
          <label htmlFor="name" className="Form-label block ta-left mb5">
            Name
          </label>
          <input id="name" name="name" className="Form-input w100p" type="text" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="Form-row">
          <label htmlFor="desc" className="Form-label block ta-left mb5">
            Description
          </label>
          <textarea className="Form-textarea w100p" type="text" rows="3" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <button type="submit" className="Button Button--primary w100p mt20">
          Save
        </button>
      </form>
    </section>
  );
}

export default CreateTask;
