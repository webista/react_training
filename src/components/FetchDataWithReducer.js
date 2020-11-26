import React, { useContext, useReducer, useState } from "react";
import Page from "./Page";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import ModalContext from "../contexts/ModalContext";
import TEXTS from "../Texts";

function FetchData() {
  const RESOURCES = ["posts", "comments", "albums", "todos", "users", "simulating an error"];
  const [count, setCount] = useState(1);
  const { setModal, setModalMessage } = useContext(ModalContext);

  const initialState = {
    isLoading: false,
    data: [],
    error: ""
  };

  function reducer(state, action) {
    switch (action.type) {
      case "fetchData":
        return {
          isLoading: true,
          data: [],
          error: ""
        };
      case "success":
        return {
          isLoading: false,
          data: action.value,
          error: ""
        };
      case "error":
        return {
          isLoading: false,
          data: [],
          error: "Something went wrong :-("
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchData(resource) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
      dispatch({ type: "success", value: response.data.slice(0, count) });
    } catch (error) {
      console.warn(error);
      dispatch({ type: "error" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.querySelector("select").value) {
      const resourceId = e.target.querySelector("select").value;
      fetchData(RESOURCES[resourceId]);
      dispatch({ type: "fetchData" });
    } else {
      setModal(true);
      setModalMessage(TEXTS.custom_select_nothing_selected);
    }
  }

  return (
    <Page title="Data fetching">
      <h2>Data fetching with Reducer</h2>
      <p>
        Get some fake data using{" "}
        <a href="https://github.com/axios/axios" target="_blank" rel="noreferrer">
          Axios
        </a>{" "}
        and{" "}
        <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">
          JSONPlaceholder
        </a>
      </p>
      <form className="Form mt20" onSubmit={handleSubmit}>
        <div className="Form-rowFlex">
          <label className="Form-label mr10 xs-mb10">Resources</label>
          <CustomSelect data={RESOURCES} />
          <label className="Form-label ml10 mr10 xs-mt10 xs-mb10" htmlFor="count">
            Items (1 - 10)
          </label>
          <input className="Form-input Form-input--w80 mr10" type="number" name="" value={count} min="1" max="10" onChange={(e) => setCount(e.target.value && parseInt(e.target.value))} id="count" />
          <button className="Button Button--primary xs-mt10" type="submit">
            Show data
          </button>
        </div>
      </form>
      {state.isLoading ? <strong className="Text Text--big block mt30 f-bold">Loading data...</strong> : null}
      {state.error ? (
        <strong className="Text Text--big block mt30 f-bold">{state.error}</strong>
      ) : (
        <ol className="OrderedList OrderedList--animated Data mt30">
          {state.data.map((item, index) => (
            <li key={index} style={{ animationDelay: index / 10 + "s" }}>
              <code className="block ta-left mt10">{JSON.stringify(item, null, 2)}</code>
            </li>
          ))}
        </ol>
      )}
    </Page>
  );
}

export default FetchData;
