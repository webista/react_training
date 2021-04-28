/**
 * Hooks
 *
 * * useState()
 * ! const [value, setter function] = useState(initialValue);
 * ! const [state, setState] = useState(initialState);
 * ! Returns a stateful value and a function to update it.
 * ! Hooks can only be called inside of the body of a function component.
 *
 * * useEffect(a, b)
 * a - Function
 * b - Array of values / dependencies that I want to watch for changes and when React detects that those things have changed, only then will it actually call the function
 * ! Without second parameter the function will be executed every render of the component
 * ! With empty array as a second parameter the function will be executed just once
 *
 * * useReducer(reducer, initialState)
 * ! const [state, dispatch] = useReducer(reducer, initialState);
 * ! Returns current state value and dispatch method from the reducer function
 * Use for local state management
 *
 * * useContext()
 * Use for global state management
 *
 * * useRef()
 * Use to store any mutable value or hold a reference to DOM node using the ref attribute
 * Stored value will persist through the re-renders
 *
 */

import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Page from "./Page";
import Tile from "./Tile";
import TestContext from "../contexts/TestContext";
import useComponentLog from "../hooks/useComponentLog";

function HooksBasicExamples() {
  useComponentLog("HooksBasicExamples");

  const testContext = useContext(TestContext);
  const testTileContent = {
    name: "Tile component",
    message: "Hi, I'm Tile component"
  };

  function Time() {
    const [time, setTime] = useState(new Date().toLocaleString());

    // setTimeout(function () {
    //   setTime(new Date().toLocaleString());
    // }, 1000);
    useEffect(() => {
      // ! Prevent set state to an unmounted component, see https://www.debuggr.io/react-update-unmounted-component/ (not necessary due clean-up function)
      // let isMounted = true;
      const interval = setInterval(() => {
        // if (isMounted) {
        setTime(new Date().toLocaleString());
        // }
      }, 1000);

      // ! Clean-up function
      return () => {
        clearInterval(interval);
      };
      // return () => (isMounted = false);
    }, []);

    return (
      <section>
        <h3>Time</h3>
        <p>
          The current time is: <strong>{time}</strong>.
        </p>
      </section>
    );
  }

  function Coordinates() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function logMousePosition(e) {
      console.log("Coordinates - Mouse event");
      setX(e.clientX);
      setY(e.clientY);
    }

    useEffect(() => {
      console.log("Coordinates - useEffect called just once");
      window.addEventListener("mousemove", logMousePosition);

      // ! Clean-up function
      return () => {
        console.log("Coordinates - Component un-mounted");
        window.removeEventListener("mousemove", logMousePosition);
      };
    }, []);

    return (
      <section>
        <h3>Mouse position</h3>
        <p>
          <span className="ml5 mr5">
            X coordinate: <strong>{x}</strong>
          </span>
          <span className="ml5 mr5">
            Y coordinate: <strong>{y}</strong>
          </span>
        </p>
      </section>
    );
  }

  function Counter() {
    const initialValue = 0;
    const [count, setCount] = useState(initialValue);

    useEffect(() => {
      console.log(`Count was changed to: ${count}`);

      if (count < 0) {
        console.log("Negative number!");
      }
    }, [count]);

    return (
      <section>
        <h3>Counter with useState</h3>
        <form className="Form">
          <div className="Form-row">
            <p>
              Local count: <var>{count}</var>
            </p>
          </div>
          <div className="Form-row">
            <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => setCount((prevCount) => prevCount + 1)}>
              Plus one
            </button>
            <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => setCount((prevCount) => prevCount - 1)}>
              Minus one
            </button>
            <button type="button" className="Button Button--danger ml5 mr5 mb10" onClick={() => setCount(initialValue)}>
              Reset
            </button>
          </div>
          <div className="Form-row">
            <label className="Form-label" htmlFor="count">
              Set new count via input
            </label>
            <input className="Form-input Form-input--w80 ml10 mr10" type="number" name="" defaultValue="0" min="0" onChange={(e) => setCount(e.target.value && parseInt(e.target.value))} id="count" />
          </div>
        </form>
      </section>
    );
  }

  function CounterWithReducer() {
    // Reducer initial state value
    const initialState = 0;

    // ! Reducer function accepts two parameters: state and action
    function reducer(state, action) {
      // ! Returns a new state by the action (Increment, Decrement, Reset)
      switch (action.type) {
        case "increment":
          return state + 1;
        case "decrement":
          return state - 1;
        case "setNew":
          return action.value;
        case "reset":
          return initialState;
        default:
          return state;
      }
    }

    // ! Current state value and dispatch method from the reducer function above
    const [count, dispatch] = useReducer(reducer, initialState);

    return (
      <section>
        <h3>Counter with useReducer</h3>
        <form className="Form">
          <div className="Form-row">
            <p>
              Local count: <var>{count}</var>
            </p>
          </div>
          <div className="Form-row">
            <button type="button" className="Button Button--primary ml5 mr5 mb10" onClick={() => dispatch({ type: "increment" })}>
              Plus one
            </button>
            <button type="button" className="Button Button--secondary ml5 mr5 mb10" onClick={() => dispatch({ type: "decrement" })}>
              Minus one
            </button>
            <button type="button" className="Button Button--danger ml5 mr5 mb10" onClick={() => dispatch({ type: "reset" })}>
              Reset
            </button>
          </div>
          <div className="Form-row">
            <label className="Form-label" htmlFor="count2">
              Set new count via input
            </label>
            <input className="Form-input Form-input--w80 ml10 mr10" type="number" name="" defaultValue="0" min="0" onChange={(e) => dispatch({ type: "setNew", value: e.target.value && parseInt(e.target.value) })} id="count2" />
          </div>
        </form>
      </section>
    );
  }

  function CounterWithRef() {
    const [count, setCount] = useState(0);
    const interval = useRef();

    useEffect(() => {
      interval.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
      return () => {
        clearInterval(interval.current);
      };
    }, []);

    return (
      <section>
        <h3>Counter with useRef</h3>
        <p>
          Local count: <var>{count}</var>
        </p>
        <button className="Button Button--danger mt20" type="button" onClick={() => clearInterval(interval.current)}>
          Stop it
        </button>
      </section>
    );
  }

  function InputWithRef() {
    const [name, setName] = useState("");
    const prevName = useRef();
    const inputRef = useRef();

    useEffect(() => {
      prevName.current = name;
    }, [name]);

    function focus() {
      inputRef.current.focus();
    }

    return (
      <section>
        <h3>useRef</h3>
        <form className="Form mt20">
          <div className="Form-row">
            <label className="Form-label" htmlFor="name">
              My name is <strong>{name}</strong> and it used to be <strong>{prevName.current}</strong>
            </label>
          </div>
          <div className="Form-row">
            <input className="Form-input" type="text" name="" onChange={(e) => setName(e.target.value)} id="name" ref={inputRef} value={name} />
          </div>
          <button className="Button Button--danger mt20" type="button" onClick={focus}>
            Focus
          </button>
        </form>
      </section>
    );
  }

  function ColorSwitcher() {
    const [isPrimary, setColor] = useState(true);

    return (
      <section className="mt30">
        <h3>Color switcher</h3>
        <button type="button" className={`Button Button--w240 Button--${isPrimary ? "primary" : "secondary"} ml5 mr5 mb10 mt30`} onClick={() => setColor(!isPrimary)}>
          Change my color
        </button>
      </section>
    );
  }

  function ShowHide() {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <section>
        <h3>Show / hide</h3>
        <button type="button" className="Button Button--w240 Button--secondary ml5 mr5 mb10 mt30" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide Tile component" : "Show Tile component"}
        </button>
        <div className="Tiles mt20">{isVisible && <Tile addedClass={"mt20"} heading={testTileContent.name} text={testTileContent.message} />}</div>
      </section>
    );
  }

  return (
    <Page title="Hooks basic examples">
      <h2>Hooks basic examples</h2>
      <div>
        <p>
          TestContext value: <var className="inline-block mt10">{testContext}</var>
        </p>
      </div>
      <Time />
      <Coordinates />
      <Counter />
      <CounterWithReducer />
      <CounterWithRef />
      <InputWithRef />
      <ColorSwitcher />
      <ShowHide />
    </Page>
  );
}

export default HooksBasicExamples;
