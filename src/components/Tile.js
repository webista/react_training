import React from "react";

// Using object destructuring instead of props
function Tile({ heading, text, style }) {
  console.log("Tile component rendering");

  return (
    <li className="Tile" style={style}>
      <h4 className="Tile-heading">{heading}</h4>
      {text ? <p className="Tile-text">{text}</p> : ""}
    </li>
  );
}

export default Tile;
