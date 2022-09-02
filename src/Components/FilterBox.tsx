import "../App.css";
import React, { ChangeEvent } from "react";

type Props = {
  handleFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};
const FilterBox: React.FC<Props> = ({handleFilterChange}) => {
  const options = [
    { value: "all", label: "All" },
    { value: "done", label: "Done" },
    { value: "undone", label: "Undone" },
  ];
  
  return (
    <select
      onChange={handleFilterChange}
      id="filterBox"
      name="filterTask"
    >
      {options.map((v, k) => (
        <option value={v.value} key={k}>{v.label}</option>
      ))}
    </select>
  );
};

export default FilterBox;
