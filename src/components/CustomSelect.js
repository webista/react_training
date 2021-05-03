import React, { useState } from "react";
import useComponentLog from "../hooks/useComponentLog";

let selectedOptionId = "";

function CustomSelect(props) {
  useComponentLog("CustomSelect");

  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(e) {
    e.preventDefault();
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.addEventListener("click", handleOutsideSelect);
  }

  function handleOption(props) {
    console.log("Selected option id:", props.target.value);
    selectedOptionId = props.target.value;
    const select = document.querySelector("#js-CustomSelect select");
    select.value = selectedOptionId;
  }

  function handleOutsideSelect(e) {
    const select = document.getElementById("js-CustomSelect");
    if (select && !select.contains(e.target)) {
      setIsOpen(false);
      document.removeEventListener("click", handleOutsideSelect);
    }
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Escape") {
      setIsOpen(false);
    }
  });

  return (
    <div className={isOpen ? "CustomSelect is-active" : "CustomSelect"} id="js-CustomSelect" onMouseDown={handleSelect}>
      <select>
        <option value="">--Choose one--</option>
        {props.data.map((optionItem, index) => (
          <option value={index} key={index}>
            {optionItem}
          </option>
        ))}
      </select>
      <ul className={isOpen ? "CustomSelect-options is-active" : "CustomSelect-options"} id="js-CustomSelect-options">
        {props.data.map((optionItem, index) => (
          <li value={index} key={index} onMouseDown={handleOption}>
            {optionItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { selectedOptionId };
export default CustomSelect;
