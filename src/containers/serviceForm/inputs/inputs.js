import React from "react";

const Inputs = (props) => {
  let inputElement;
  switch (props.elType) {
    case "input":
      inputElement = (
        <input
          className={props.className}
          value={props.value}
          name={props.name}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <input
          type="checkbox"
          className={props.className}
          onChange={props.changed}
          checked={props.checked}
          {...props.elementConfig}
        />
      );
      break;

    default:
      inputElement = (
        <input
          className={props.className}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
  }

  return <div>{inputElement}</div>;
};

export default Inputs;
