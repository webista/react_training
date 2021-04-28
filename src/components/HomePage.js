import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import CountContext from "../contexts/CountContext";
import ModalContext from "../contexts/ModalContext";
import TEXTS from "../Texts";
import logoReact from "../images/react.png";

function HomePage() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const countContext = useContext(CountContext);
  const { setModal, setModalMessage } = useContext(ModalContext);
  const textarea = useRef(null);

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
      textarea.current.focus();
    }
  }

  return (
    <Page title="Home page">
      <h2>Home page</h2>
      <p>Some text on Home page.</p>
      <p>
        Global count: <var>{countContext.countState}</var>
      </p>
      <p>
        You can change it on <Link to="/new_page">New page</Link>
      </p>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <label className="Form-label block">Type something</label>
        <textarea className="Form-textarea ta-center w100p mt10" type="text" rows="2" defaultValue={text} onChange={(e) => setText(e.target.value)} ref={textarea} />
        {error && <p className="Form-message Form-message--warning">{error}</p>}
        <button className="Button Button--primary w100p mt10" type="submit">
          Show it in a Modal
        </button>
      </form>
      <img className="block-center mt30" src={logoReact} width="300" height="212" alt="React" />
    </Page>
  );
}

export default HomePage;
