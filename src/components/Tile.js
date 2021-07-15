import React from "react";
import useComponentLog from "../hooks/useComponentLog";

// Using object destructuring instead of props
function Tile({ heading, text }) {
  useComponentLog("Tile");

  return (
    <li className="Tile">
      <h4 className="Tile-heading">{heading}</h4>
      {text ? <p className="Tile-text">{text}</p> : ""}
    </li>
  );
}

export default Tile;
