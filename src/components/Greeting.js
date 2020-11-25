import React from "react";

function Greeting(props) {
  function deleteGreeting() {
    // "New" Greetings without Greeting with props.id (the one I want to remove)
    props.setGreetings((greetings) => greetings.filter((greeting) => greeting.id !== props.id));
    console.log(`Greeting id ${props.id} was deleted`);
  }

  return (
    <li className="Tile" style={{ animationDelay: props.animDelay / 10 + "s" }}>
      <h4 className="Tile-heading">{props.author}</h4>
      <p className="Tile-text">{props.message}</p>
      <button className="Button Button--tiny Button--danger" onClick={deleteGreeting}>
        ×
      </button>
    </li>
  );
}

export default Greeting;
