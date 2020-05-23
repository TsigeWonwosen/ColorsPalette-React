import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

import seedColors from "./seedColors";

const styles = {
  root: {
    backgroundColor: "transparent",
    fontWeight: "700",
    fontSize: "12px",
    margin: "0",
    "& span": {
      color: "white",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "45%",
    margin: "0 auto",
  },
  palette: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "13%",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#444",
    background: "white",
  },
  paletteBody: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paletteSingleBox: {
    width: "20%",
    height: "25%",
  },
};

function SinglePalette({ classes, history }) {
  const handleChange = (id) => {
    history.push(`/palette/${id}`);
  };
  const paletteList = seedColors.map((palette) => (
    // <Link to={`/palette/${palette.id}`}>
    <div
      key={palette.id}
      className='paletteList'
      onClick={() => handleChange(palette.id)}
    >
      <div className={classes.paletteBody}>
        {palette.colors.map((color) => (
          <div
            style={{ background: `${color.color}` }}
            className={classes.paletteSingleBox}
          ></div>
        ))}
      </div>
      <div className={classes.palette}>
        <span className={classes.root}>{palette.paletteName}</span>
        <span>{palette.emoji}</span>
      </div>
      <button className='closeButton'>
        {" "}
        <DeleteForeverRoundedIcon />{" "}
      </button>
    </div>
    // </Link>
  ));

  // const id = props.match.params.id;
  // if (/\d/.test(id)) {
  //   console.log("Redirect to Home ... Peace.", props);
  //   return <Redirect to='/' />;
  // }
  // //   console.log("Id  :" + id);
  // let renderPalette = singlePalette.colors.map((color) => {
  //   return <ColorBox color={color} key={color.name} />;
  // });
  // const { classes } = props;
  return (
    <div className='Palette-mini'>
      <div className={classes.header}>
        <h4>React Colors</h4>
        <span>Colors Picker</span>
      </div>
      <div className='Palette-list'>{paletteList}</div>
    </div>
  );
}

export default withStyles(styles)(SinglePalette);
