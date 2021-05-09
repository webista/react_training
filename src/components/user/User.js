import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page from "../Page";
import UserLoggedOut from "./UserLoggedOut";
import UserLoggedIn from "./UserLoggedIn";
// import LogIn from "./LogIn";
import LogInWithReducer from "./LogInWithReducer";
import SignUp from "./SignUp";
import Account from "./Account";
import Tasks from "./Tasks";
import UserContext from "../../contexts/UserContext";

function User() {
  const [loggedIn, setLoggedIn] = useState(Boolean(parseInt(localStorage.getItem("reactTraining-user-isLoggedIn"))));
  const user = {
    username: "",
    email: "",
    password: "",
    isLoggedIn: loggedIn
  };

  useEffect(() => {
    console.log("User logged in:", loggedIn);
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ user, setLoggedIn }}>
      <BrowserRouter basename="/react_training">
        <Switch>
          <Route exact path="/user">
            <Page title="User">
              <h2>User page</h2>
              <p>This is User page using Local Storage as a DB simulation</p>
              {user.isLoggedIn ? <UserLoggedIn /> : <UserLoggedOut />}
            </Page>
          </Route>
          {/* <Route path="/user/log_in" component={LogIn} exact /> */}
          <Route path="/user/log_in" component={LogInWithReducer} exact />
          <Route path="/user/sign_up" component={SignUp} exact />
          <Route path="/user/account" component={Account} exact />
          <Route path="/user/tasks" component={Tasks} exact />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default User;
