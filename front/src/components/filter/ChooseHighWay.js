import React, { useRef } from "react";
import { Dropdown } from "semantic-ui-react";

const highwayOptions = [
  { value: "all", text: "Kaikki" },
  { value: 1, text: "1 / E18" },
  { value: 2, text: "2" },
  { value: 3, text: "3 / E12" },
  { value: 4, text: "4 / E75" },
  { value: 5, text: "5 / E63" }
];

const ChooseHighWay = ({ highway, setHighway }) => {
  const ref = useRef();

  const handleOnChange = (event, data) => {
    setHighway(data.value);
    ref.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <form ref={ref}>
      <label htmlFor="highwayFilterDropdown">Valtatie</label>
      <Dropdown
        id="highwayFilterDropdown"
        className="icon"
        icon="road"
        labeled
        button
        fluid
        floating
        options={highwayOptions}
        value={highway}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default ChooseHighWay;
