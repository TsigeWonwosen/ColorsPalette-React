import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  DraggableBox: {
    backgroundColor: (props) => props.color,
    width: "190px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    position: "relative",
    "&:hover button": {
      opacity: 1,
    },
  },
  btnDelete: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "3px",
    color: "white",
    backgroundColor: "red",
    border: "none",
    opacity: "0",
  },
};

function DraggableColorBox({ color, name, classes, deleteColor, id }) {
  return (
    <div className={classes.DraggableBox}>
      {name}
      <button className={classes.btnDelete} onClick={() => deleteColor(id)}>
        X
      </button>
    </div>
  );
}
export default withStyles(styles)(DraggableColorBox);
