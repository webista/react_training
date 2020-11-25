import React, { useState } from "react";

let selectedOptionId = "";

function CustomSelect(props) {
  console.log("CustomSelect component rendering");
  console.log("CustomSelect data:", props.data);
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(e) {
    e.preventDefault();
    setIsOpen((prevIsOpen) => !prevIsOpen);
    console.log("Add listener");
    document.addEventListener("click", handleOutsideSelect);
  }

  function handleOption(props) {
    console.log("Selected option id:", props.target.value);
    selectedOptionId = props.target.value;
    const select = document.getElementById("js-CustomSelect");
    select.value = selectedOptionId;
    setIsOpen(false);
  }

  function handleOutsideSelect(e) {
    const select = document.getElementById("js-CustomSelect");
    const selectOptions = document.getElementById("js-CustomSelect-options");
    if (select && !select.contains(e.target)) {
      console.log("Click outside the Select box");
      select.classList.remove("is-active");
      selectOptions.classList.remove("is-active");
      setIsOpen(false);
      document.removeEventListener("click", handleOutsideSelect);
    }
  }

  return (
    <div className="pos-rel">
      <select className={isOpen ? "CustomSelect is-active" : "CustomSelect"} id="js-CustomSelect" onMouseDown={handleSelect}>
        <option value="">--Choose one--</option>
        {props.data.map((optionItem, index) => (
          <option value={index} key={index}>
            {optionItem}
          </option>
        ))}
      </select>
      <ul className={isOpen ? "CustomSelect-options is-active" : "CustomSelect-options"} id="js-CustomSelect-options">
        {props.data.map((optionItem, index) => (
          <li value={index} key={index} onClick={handleOption}>
            {optionItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { selectedOptionId };
export default CustomSelect;
