import React from "react";

const Inputs = (props) => {
  let inputElement;
  switch (props.elType) {
    case "input":
      inputElement = (
        <div className="input-element-wrapper">
          <input
            className={props.className}
            value={props.value}
            name={props.name}
            onChange={props.changed}
            {...props.elementConfig}
          />
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className="input-checkbox-wrapper">
          <input
            type="checkbox"
            className={props.className}
            onChange={props.changed}
            checked={props.checked}
            {...props.elementConfig}
          />
        </div>
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

  return inputElement;
};

export default Inputs;
