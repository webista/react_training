import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <div className="Container">
        <h1>
          <Link to="/" exact>
            React Training
          </Link>
        </h1>
        <p>Simple app for learning React</p>
        <nav className="Nav">
          <ul>
            <li className="Nav-item">
              <NavLink to="/" exact activeClassName="is-active">
                Home page
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/new_page" activeClassName="is-active">
                New page
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/hooks_basic_examples" activeClassName="is-active">
                Hooks basic examples
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/multiple_reducers" activeClassName="is-active">
                Multiple Reducers
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/metal_bands" activeClassName="is-active">
                Metal bands
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/greetings" activeClassName="is-active">
                Greetings
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/user" activeClassName="is-active">
                User page
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/data_fetching" activeClassName="is-active">
                Data fetching
              </NavLink>
            </li>
            <li className="Nav-item">
              <NavLink to="/data_fetching-reducer" activeClassName="is-active">
                Data fetching with Reducer
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
