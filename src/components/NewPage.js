import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import TestContext from "../contexts/TestContext";
import CountContext from "../contexts/CountContext";

function NewPage() {
  const testContext = useContext(TestContext);
  const countContext = useContext(CountContext);

  return (
    <Page title="New page">
      <h2>New page</h2>
      <p>Just a new page for routing and useReducer with useContext testing</p>
      <section>
        <h3>TestContext value</h3>
        <p>
          Global test value: <var className="inline-block mt10">{testContext}</var>
        </p>
      </section>
      <section>
        <h3>CountContext value</h3>
        <form className="Form">
          <div className="Form-row">
            <p>
              Global count: <var className="inline-block mt10">{countContext.countState}</var>
            </p>
          </div>
          <div className="Form-row">
            <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => countContext.countDispatch("increment")}>
              Plus one
            </button>
            <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => countContext.countDispatch("decrement")}>
              Minus one
            </button>
            <button type="button" className="Button Button--danger ml5 mr5 mb10" onClick={() => countContext.countDispatch("reset")}>
              Reset
            </button>
          </div>
        </form>
        <p>
          See updated count on <Link to="/">Home page</Link>
        </p>
      </section>
    </Page>
  );
}

export default NewPage;
