import React, { useContext, useState } from "react";
import Page from "./Page";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import ModalContext from "../contexts/ModalContext";
import TEXTS from "../Texts";

function FetchData() {
  const RESOURCES = ["posts", "comments", "albums", "todos", "users", "simulating an error"];
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const { setModal, setModalMessage } = useContext(ModalContext);

  async function fetchData(resource) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
      setIsLoading(false);
      setData(response.data.slice(0, count));
      setError("");
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      setError("Something went wrong :-(");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.querySelector("select").value) {
      const resourceId = e.target.querySelector("select").value;
      fetchData(RESOURCES[resourceId]);
      setIsLoading(true);
    } else {
      setModal(true);
      setModalMessage(TEXTS.custom_select_nothing_selected);
    }
  }

  return (
    <Page title="Data fetching">
      <h2>Data fetching</h2>
      <p>
        Fetch some fake data using{" "}
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
      {isLoading ? <strong className="Text Text--big block mt30 f-bold">Loading data...</strong> : null}
      {error ? (
        <strong className="Text Text--big block mt30 f-bold">{error}</strong>
      ) : (
        <ol className="OrderedList OrderedList--animated Data mt30">
          {data.map((item, index) => (
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
