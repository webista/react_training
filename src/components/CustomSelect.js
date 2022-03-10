import React, { useState } from "react";
import useComponentLog from "../hooks/useComponentLog";

function CustomSelect(props) {
  useComponentLog("CustomSelect");

  const [isOpen, setIsOpen] = useState(false);

  const select = document.querySelector("#js-CustomSelect select");
  const customSelect = document.getElementById("js-CustomSelect");

  function handleCustomSelect(e) {
    e.preventDefault();
    setIsOpen((prevIsOpen) => !prevIsOpen);
    document.addEventListener("click", handleOutsideCustomSelect);
  }

  function handleCustomOption(props) {
    let selectedOptionId = props.target.value;
    select.value = selectedOptionId;
  }

  function handleOutsideCustomSelect(e) {
    if (customSelect && !customSelect.contains(e.target)) {
      setIsOpen(false);
      document.removeEventListener("click", handleOutsideCustomSelect);
    }
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Escape") {
      setIsOpen(false);
    }
  });

  return (
    <div className={isOpen ? "CustomSelect is-active" : "CustomSelect"} id="js-CustomSelect" onMouseDown={handleCustomSelect}>
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
          <li value={index} key={index} onMouseDown={handleCustomOption}>
            {optionItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
