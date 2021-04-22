import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Lettuce", type: "lettuce" },
];

const buildcontrols = (props) => {
  // debugger;
  // console.log("this was returned" +props);
  return(
  <div className={classes.BuildControls}>
    <p>
      Current Price:<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((cntrl) => (
      <BuildControl
        key={cntrl.label}
        label={cntrl.label}
        added={() => {
          props.ingredientsAdded(cntrl.type);
        }}
        removed={() => {
          props.ingredientsRemoved(cntrl.type);
        }}
        disabled={props.disabled[cntrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
  )
};
export default buildcontrols;
