import React, { useEffect, useState } from "react";

const RadioBox = ({ prices,handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) =>{
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => {
    return (
      <div key={i}>
        <input
          onChange={handleChange}
          value={`${p._id}`}
          type="radio"
          name="x"
          className="mr-2 ml-4"
        />
        <label className="form-check-label">{p.name}</label>
      </div>
    );
  });
};

export default RadioBox;