import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function UserLoggedOut() {
  const { path } = useRouteMatch();

  return (
    <section>
      <h3>User Logged out section</h3>
      <p>Log in or create an account to create tasks</p>
      <Link to={`${path}/log_in`} className="Button Button--primary mt30 ml5 mr5">
        Log in
      </Link>
      <Link to={`${path}/sign_up`} className="Button Button--secondary mt30 ml5 mr5">
        Sign up
      </Link>
    </section>
  );
}

export default UserLoggedOut;
