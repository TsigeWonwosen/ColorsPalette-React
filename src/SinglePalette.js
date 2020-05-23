import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import seedColors from "./seedColors";

const styles = {
  main: {
    backgroundColor: "rgba(39,56,73,0.1)",
    fontWeight: "700",
    "& span": {
      color: "white",
    },
  },
  palette: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "13%",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#f4f4f4",
    background: "rgba(135,135,206,1.0)",
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
    height: "23%",
  },
};

function SinglePalette({ classes }) {
  const paletteList = seedColors.map((palette) => (
    <Link to={`/palette/${palette.id}`}>
      <div key={palette.id} className='paletteList'>
        <div className={classes.palette}>
          <span className={classes.main}>{palette.paletteName}</span>
          <span>{palette.emoji}</span>
        </div>
        <div className={classes.paletteBody}>
          {palette.colors.map((color) => (
            <div
              style={{ background: `${color.color}` }}
              className={classes.paletteSingleBox}
            ></div>
          ))}
        </div>
      </div>
    </Link>
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
      <div>
        <h3>React Colors</h3>
      </div>
      <div className='Palette-list'>{paletteList}</div>
    </div>
  );
}

export default withStyles(styles)(SinglePalette);
