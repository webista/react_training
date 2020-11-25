import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Page from "../Page";
import TEXTS from "../../Texts";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";

function Account() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { setModal, setModalMessage } = useContext(ModalContext);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation only
    if (!username) {
      setError({
        ...error,
        username: TEXTS.input.user_name_empty
      });
      return false;
    }
    if (!email) {
      setError({
        ...error,
        username: "",
        email: TEXTS.input.user_email_empty
      });
      return false;
    }
    if (!password) {
      setError({
        ...error,
        username: "",
        email: "",
        password: TEXTS.input.user_password_empty
      });
      return false;
    }
    if (password.length < 6) {
      setError({
        ...error,
        username: "",
        email: "",
        password: TEXTS.input.user_password_short
      });
      return false;
    }
    localStorage.setItem("reactTraining-user-username", username);
    localStorage.setItem("reactTraining-user-email", email);
    localStorage.setItem("reactTraining-user-password", password);
    setModal(true);
    setModalMessage(TEXTS.account_edited_success);
    history.push("/user");
  }

  return (
    <Page title="Your Account">
      <h2>Your Account</h2>
      <form className="Form Form--narrow mt30" onSubmit={handleSubmit}>
        <div className="Form-row">
          <label htmlFor="username" className="Form-label block ta-left mb5">
            Username
          </label>
          <input id="username" name="username" className="Form-input w100p" type="text" defaultValue={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
          {error.username && <p className="Form-message Form-message--warning">{error.username}</p>}
        </div>
        <div className="Form-row">
          <label htmlFor="email" className="Form-label block ta-left mb5">
            Email
          </label>
          <input id="email" name="email" className="Form-input w100p" type="text" defaultValue={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
          {error.email && <p className="Form-message Form-message--warning">{error.email}</p>}
        </div>
        <div className="Form-row">
          <label htmlFor="password" className="Form-label block ta-left mb5">
            Password
          </label>
          <input id="password" name="password" className="Form-input w100p" type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
          {error.password && <p className="Form-message Form-message--warning">{error.password}</p>}
        </div>
        <button type="submit" className="Button Button--primary w100p mt30">
          Save changes
        </button>
      </form>
    </Page>
  );
}

export default Account;
