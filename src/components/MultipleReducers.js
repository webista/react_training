import React, { useReducer } from "react";
import Page from "./Page";

function MultipleReducers() {
  // Reducer initial state value
  const initialState = 0;

  const ACTIONS = {
    increment: "increment",
    decrement: "decrement",
    setNew: "setNew",
    reset: "reset"
  };

  // ! Reducer function accepts two parameters: state and action
  function reducer(state, action) {
    // ! Returns a new state by the action (Increment, Decrement, ...)
    switch (action.type) {
      case ACTIONS.increment:
        return state + action.value;
      case ACTIONS.decrement:
        return state - action.value;
      case ACTIONS.setNew:
        return action.value;
      case ACTIONS.reset:
        return initialState;
      default:
        return state;
    }
  }

  // Current state value and dispatch method from the reducer function above
  const [count, dispatch] = useReducer(reducer, initialState);
  const [countTwo, dispatchTwo] = useReducer(reducer, initialState);

  return (
    <Page title="Multiple useReducers">
      <h2>Multiple useReducers</h2>
      <form className="Form">
        <h3>First counter</h3>
        <div className="Form-row">
          <p>
            Local count: <var>{count}</var>
          </p>
        </div>
        <div className="Form-row">
          <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => dispatch({ type: ACTIONS.increment, value: 1 })}>
            Plus one
          </button>
          <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => dispatch({ type: ACTIONS.decrement, value: 1 })}>
            Minus one
          </button>
          <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => dispatch({ type: ACTIONS.increment, value: 5 })}>
            Plus five
          </button>
          <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => dispatch({ type: ACTIONS.decrement, value: 5 })}>
            Minus five
          </button>
          <button type="button" className="Button Button--danger ml5 mr5 mb10" onClick={() => dispatch({ type: ACTIONS.reset })}>
            Reset
          </button>
        </div>
        <div className="Form-row">
          <label className="Form-label" htmlFor="count">
            Set new count via input
          </label>
          <input className="Form-input Form-input--w80 ml10 mr10" type="number" name="" defaultValue="0" min="0" onChange={(e) => dispatch({ type: ACTIONS.setNew, value: e.target.value && parseInt(e.target.value) })} id="count" />
        </div>
        <h3>Second counter</h3>
        <div className="Form-row">
          <p>
            Second local count: <var>{countTwo}</var>
          </p>
        </div>
        <div className="Form-row">
          <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => dispatchTwo({ type: ACTIONS.increment, value: 1 })}>
            Plus one
          </button>
          <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => dispatchTwo({ type: ACTIONS.decrement, value: 1 })}>
            Minus one
          </button>
          <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => dispatchTwo({ type: ACTIONS.increment, value: 5 })}>
            Plus five
          </button>
          <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => dispatchTwo({ type: ACTIONS.decrement, value: 5 })}>
            Minus five
          </button>
          <button type="button" className="Button Button--danger ml5 mr5 mb10" onClick={() => dispatchTwo({ type: ACTIONS.reset })}>
            Reset
          </button>
        </div>
        <div className="Form-row">
          <label className="Form-label" htmlFor="count2">
            Set new count via input
          </label>
          <input className="Form-input Form-input--w80 ml10 mr10" type="number" name="" defaultValue="0" min="0" onChange={(e) => dispatchTwo({ type: ACTIONS.setNew, value: e.target.value && parseInt(e.target.value) })} id="count2" />
        </div>
      </form>
    </Page>
  );
}

export default MultipleReducers;
