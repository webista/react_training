import React, { useContext, useEffect, useRef, useState } from "react";
import ModalContext from "../contexts/ModalContext";

function CreateGreeting(props) {
  // ! Inputs must contain an initial value
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { setModal } = useContext(ModalContext);
  const inputToFocus = useRef(null);

  useEffect(() => {
    inputToFocus.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (author && message) {
      props.setGreetings([...props.greetings, { id: Date.now(), author, message }]);
      setAuthor("");
      setMessage("");
      setError("");
      setModal(false);
    } else {
      setError("Please fill Author and Message inputs");
    }
  }

  return (
    <section className="Section">
      <h3>Create a new greeting</h3>
      <form className="Form Form--narrow mt20" onSubmit={handleSubmit}>
        <div className="Form-row">
          <label className="Form-label block ta-left mb5">Author</label>
          <input className="Form-input w100p" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} ref={inputToFocus} />
        </div>
        <div className="Form-row">
          <label className="Form-label block ta-left mb5">Greeting</label>
          <input className="Form-input w100p" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        {error && <p className="Form-message Form-message--warning">{error}</p>}
        <button className="Button Button--primary w100p mt30" type="submit">
          Add new greeting
        </button>
      </form>
    </section>
  );
}

export default CreateGreeting;
