import React, { useState } from "react";

const Chips = ({features,setFeatures}) => {
  // const [features, setFeatures] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddFeature = () => {
    if (inputValue.trim() !== "") {
      setFeatures([...features, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteFeature = (indexToRemove) => {
    setFeatures(features.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
    if (e.key === "Backspace" && !inputValue && features.length > 0) {
      handleDeleteFeature(features.length - 1);
    }
  };

  return (
    <div className="chips-input-container">
      <label htmlFor="chips-input" className="form-label">
        Features*
      </label>
      <div className="chips-input-wrapper">
        {features.map((feature, index) => (
          <span key={index} className="chip">
            {feature}
            <button
              type="button"
              className="chip-delete"
              onClick={() => handleDeleteFeature(index)}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          id="chips-input"
          className="chips-input p-0"
          placeholder="Type and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Chips;
