import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Page from "../Page";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";
import TEXTS from "../../Texts";

function LogIn() {
  const { user, setLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState("");
  const { setModal, setModalMessage } = useContext(ModalContext);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation only
    if (username.trim() === localStorage.getItem("reactTraining-user-username") && password.trim() === localStorage.getItem("reactTraining-user-password")) {
      localStorage.setItem("reactTraining-user-isLoggedIn", 1);
      setLoggedIn(true);
      setModal(true);
      setModalMessage(TEXTS.logged_in_success);
      history.push("/user");
    } else {
      setError(TEXTS.logged_in_failure);
    }
  }

  return (
    <Page title="Log in">
      <h2>Log in</h2>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <div className="Form-row">
          <label htmlFor="username" className="Form-label block ta-left mb5">
            Username
          </label>
          <input id="username" name="username" className="Form-input w100p" type="text" autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="Form-row">
          <label htmlFor="password" className="Form-label block ta-left mb5">
            Password
          </label>
          <input id="password" name="password" className="Form-input w100p" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="Form-message Form-message--warning">{error}</p>}
        <button type="submit" className="Button Button--primary w100p mt30">
          Log in
        </button>
      </form>
    </Page>
  );
}

export default LogIn;
