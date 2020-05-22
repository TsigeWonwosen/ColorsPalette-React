import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import ColorBox from "./ColorBox";

const styles = {
  main: {
    backgroundColor: "#fbc531",
    border: "1px solid teal",
    padding: "1rem",
    "& h1": {
      color: "white",
    },
  },
};

function SinglePalette(props) {
  const id = props.match.params.id;
  if (/\d/.test(id)) {
    console.log("Redirect to Home ... Peace.", props);
    return <Redirect to='/' />;
  }
  const { singlePalette, classes } = props;
  //   console.log("Id  :" + id);
  let renderPalette = singlePalette.colors.map((color) => {
    return <ColorBox color={color} key={color.name} />;
  });
  return (
    <div className='Palette'>
      <Link to='/' className={classes.main}>
        <h1>Back to HOME </h1>
      </Link>
      <div className='Palette-colors'>{renderPalette}</div>
    </div>
  );
}

export default withStyles(styles)(SinglePalette);
