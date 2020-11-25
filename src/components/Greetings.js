import React, { useContext, useState, useEffect } from "react";
import Page from "./Page";
import Greeting from "./Greeting";
import CreateGreeting from "./CreateGreeting";
import ModalContext from "../contexts/ModalContext";

function Greetings() {
  useEffect(() => {
    console.log("Greetings section rendered!");
  }, []);

  // ! Only run once the first time this component is rendered (an empty array as the second parameter)
  useEffect(() => {
    if (localStorage.getItem("reactTraining-greetings")) {
      setGreetings(JSON.parse(localStorage.getItem("reactTraining-greetings")));
    }
  }, []);

  const [greetings, setGreetings] = useState([
    {
      id: Date.now(),
      author: "Kyle Cook",
      message: "Hello everyone"
    },
    {
      id: Date.now() + 1,
      author: "Brad Traversy",
      message: "What's going on guys"
    },
    {
      id: Date.now() + 2,
      author: "Maximilian Schwarzmüller",
      message: "Hi!"
    }
  ]);

  // ! Run every time Greetings state (the second parameter) changes
  useEffect(() => {
    localStorage.setItem("reactTraining-greetings", JSON.stringify(greetings));
  }, [greetings]);

  const { setModal, setModalComplexContent } = useContext(ModalContext);

  return (
    <Page title="Greetings">
      <h2>Greetings</h2>
      <p>Greeting cards using Local Storage as a DB simulation</p>
      <ul className="Tiles Greetings mt30">
        {greetings.map((greeting, index) => (
          <Greeting
            setGreetings={setGreetings} // Added as necessary for deleteGreeting() in Greeting component (in other words - for updating the state)
            id={greeting.id}
            author={greeting.author}
            message={greeting.message}
            key={index}
            animDelay={index}
          />
        ))}
      </ul>
      <button
        className="Button Button--primary mt20"
        type="button"
        onClick={() => {
          setModal(true);
          setModalComplexContent(<CreateGreeting greetings={greetings} setGreetings={setGreetings} />);
        }}
      >
        Add new greeting
      </button>
    </Page>
  );
}

export default Greetings;
