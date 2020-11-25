import React, { useContext } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";
import TEXTS from "../../Texts";

function UserLoggedIn() {
  const { user, setLoggedIn } = useContext(UserContext);
  const { setModal, setModalMessage } = useContext(ModalContext);
  user.username = localStorage.getItem("reactTraining-user-username");
  user.email = localStorage.getItem("reactTraining-user-email");
  user.password = localStorage.getItem("reactTraining-user-password");
  user.isLoggedIn = Boolean(parseInt(localStorage.getItem("reactTraining-user-isLoggedIn")));
  // user.isSignedUp = Boolean(localStorage.getItem("reactTraining-user-id"));

  const history = useHistory();
  const { path } = useRouteMatch();

  function logout() {
    localStorage.setItem("reactTraining-user-isLoggedIn", 0);
    setLoggedIn(false);
    setModal(true);
    setModalMessage(TEXTS.logged_out_success);
    history.push("/user");
  }

  return (
    <section>
      <h3>User Logged in section</h3>
      <p>
        Welcome <strong>{user.username}</strong>
      </p>
      <div>
        <p>
          <strong>User data:</strong>
        </p>
        <pre className="inline-block ta-left mt10">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div className="mt30"></div>
      <Link to={`${path}/tasks`} className="Button Button--primary ml5 mr5 mb10">
        My tasks
      </Link>
      <Link to={`${path}/account`} className="Button Button--secondary ml5 mr5 mb10">
        Edit account
      </Link>
      <button className="Button Button--danger ml5 mr5 mb10" onClick={logout}>
        Log out
      </button>
    </section>
  );
}

export default UserLoggedIn;
