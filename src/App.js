import React, { useReducer, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import NewPage from "./components/NewPage";
import HooksBasicExamples from "./components/HooksBasicExamples";
import MultipleReducers from "./components/MultipleReducers";
import MetalBands from "./components/MetalBands";
import Greetings from "./components/Greetings";
import User from "./components/user/User";
import FetchData from "./components/FetchData";
import FetchDataWithReducer from "./components/FetchDataWithReducer";
import Modal from "./components/Modal";

// Contexts
import TestContext from "./contexts/TestContext";
import CountContext from "./contexts/CountContext";
import ModalContext from "./contexts/ModalContext";

function App() {
  // Global Counter
  const initialCountState = 0;

  function countReducer(state, action) {
    switch (action) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "reset":
        return initialCountState;
      default:
        return state;
    }
  }

  const [count, dispatch] = useReducer(countReducer, initialCountState);

  // Global Modal
  const [modal, setModal] = useState();
  const [modalMessage, setModalMessage] = useState("");
  const [modalComplexContent, setModalComplexContent] = useState(null);

  return (
    <TestContext.Provider value={999}>
      <CountContext.Provider value={{ countState: count, countDispatch: dispatch }}>
        <ModalContext.Provider value={{ setModal, setModalMessage, setModalComplexContent }}>
          <BrowserRouter basename="/react_training">
            <Header />
            <Switch>
              {/* Route is the conditionally shown component based on matching a path to a URL. */}
              {/* The "exact" param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url. */}
              <Route path="/" exact component={HomePage} />
              <Route path="/new_page" component={NewPage} />
              <Route path="/hooks_basic_examples" component={HooksBasicExamples} />
              <Route path="/multiple_reducers" component={MultipleReducers} />
              <Route path="/metal_bands" component={MetalBands} />
              <Route path="/greetings" component={Greetings} />
              <Route path="/user" exact component={User} />
              <Route path="/data_fetching" component={FetchData} />
              <Route path="/data_fetching-reducer" component={FetchDataWithReducer} />
            </Switch>
          </BrowserRouter>
          {modal && <Modal message={modalMessage} complexContent={modalComplexContent} />}
        </ModalContext.Provider>
      </CountContext.Provider>
    </TestContext.Provider>
  );
}

export default App;
