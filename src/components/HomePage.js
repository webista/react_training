import React, { useContext, useEffect, useRef, useState } from "react";
import Page from "./Page";
import CountContext from "../contexts/CountContext";
import ModalContext from "../contexts/ModalContext";
import TEXTS from "../Texts";

function HomePage() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const countContext = useContext(CountContext);
  const { setModal, setModalMessage } = useContext(ModalContext);
  const textarea = useRef(null);

  useEffect(() => {
    // Focus the textarea using useRef Hook
    textarea.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (text) {
      if (error) {
        setError("");
      }
      setModal(true);
      setModalMessage(text);
    } else {
      setError(TEXTS.input.empty);
    }
  }

  return (
    <Page title="Home page">
      <h2>Home page</h2>
      <p>Some text on Home page.</p>
      <p>
        Global count: <var>{countContext.countState}</var>
      </p>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <label className="Form-label block">Type something</label>
        <textarea className="Form-textarea ta-center w100p mt10" type="text" rows="2" defaultValue={text} onChange={(e) => setText(e.target.value)} ref={textarea} />
        {error && <p className="Form-message Form-message--warning">{error}</p>}
        <button className="Button Button--primary w100p mt10" type="submit">
          Show it in a Modal
        </button>
      </form>
    </Page>
  );
}

export default HomePage;
