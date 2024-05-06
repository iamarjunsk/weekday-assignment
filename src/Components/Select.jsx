import React, { useEffect, useState, useRef } from "react";

export default function Select({ value, onChange, _options, placeholder }) {
  // State variables
  const [options, setOptions] = useState([..._options]);
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const selectRef = useRef(null);

  // Update options when _options change
  useEffect(() => {
    setOptions([..._options]);
  }, [_options]);

  // Move an option from available to selected
  function movetoSelected(i) {
    const selectedOption = options[i];
    setOptions(options.filter((_, index) => index !== i));
    onChange([...value, selectedOption]);
  }

  // Remove a selected option
  function removeFromSelected(i) {
    const removedOption = value[i];
    setOptions([...options, removedOption]);
    onChange(value.filter((_, index) => index !== i));
  }

  // Toggle dropdown visibility
  function handleToggle() {
    setToggle((prevToggle) => !prevToggle);
  }

  // Close dropdown when clicked outside
  function handleClickOutside(event) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setToggle(false);
    }
  }

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input change for search
  function handleInputChange(e) {
    setSearchValue(e.target.value);
    setToggle(true);
    search(e.target.value);
  }

  // Search function to filter options based on input value
  function search(val) {
    const filteredOptions = _options.filter((item) => {
      if (typeof item === "string") {
        return item.includes(val);
      } else if (typeof item === "number") {
        return item.toString().includes(val);
      }
      return false;
    });
    setOptions(filteredOptions);
  }

  return (
    <div className="fil-field" ref={selectRef}>
      {/* Selected options */}
      <span className="values">
        {value.map((e, i) => (
          <span key={i} className="selected-opt">
            {e}{" "}
            <span onClick={() => removeFromSelected(i)} className="cls-btn">
              &times;
            </span>
          </span>
        ))}
        {/* Input for searching */}
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={!value.length ? placeholder : ""}
        />
      </span>
      {/* Clear search button */}
      <button className="cls-btn" onClick={()=>setSearchValue('')}>&times;</button>
      {/* Divider */}
      <div className="divider"></div>
      {/* Dropdown toggle */}
      <div className="caret" onClick={handleToggle}>
        {/* Caret icon */}
        <svg
          fill="currentColor"
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>
      {/* Dropdown options */}
      {toggle && (
        <ul>
          {options.length ? (
            options.map((e, i) => (
              <li onClick={() => movetoSelected(i)} key={i}>{e}</li>
            ))
          ) : (
            <li>Nothing to show</li>
          )}
        </ul>
      )}
    </div>
  );
}
