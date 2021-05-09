import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Page from "../Page";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";
import TEXTS from "../../Texts";

function LogIn() {
  const { user, setLoggedIn } = useContext(UserContext);
  const { setModal, setModalMessage } = useContext(ModalContext);
  const history = useHistory();
  const inputToFocus = useRef(null);

  const initialState = {
    username: user.username,
    password: user.password,
    error: ""
  };

  function reducerLogIn(state, action) {
    switch (action.type) {
      case "field":
        return {
          ...state,
          // username: action.value,
          // password: action.value
          [action.field]: action.value
        };
      case "error":
        return {
          ...state,
          error: TEXTS.logged_in_failure,
          username: "",
          password: ""
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerLogIn, initialState);
  const { username, password, error } = state;

  useEffect(() => {
    inputToFocus.current.focus();
  }, []);

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
      dispatch({ type: "error" });
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
          <input id="username" name="username" className="Form-input w100p" type="text" autoComplete="off" onChange={(e) => dispatch({ type: "field", field: "username", value: e.target.value })} ref={inputToFocus} />
        </div>
        <div className="Form-row">
          <label htmlFor="password" className="Form-label block ta-left mb5">
            Password
          </label>
          <input id="password" name="password" className="Form-input w100p" type="password" onChange={(e) => dispatch({ type: "field", field: "password", value: e.target.value })} />
        </div>
        {error && <p className="Form-message Form-message--warning">{error}</p>}
        <button type="submit" className="Button Button--primary w100p mt30">
          Log in
        </button>
      </form>
      <br />
      <Link to="/user" className="Link inline-block mt20">
        Back
      </Link>
    </Page>
  );
}

export default LogIn;
