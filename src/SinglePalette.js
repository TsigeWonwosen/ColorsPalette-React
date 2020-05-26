import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

// import seedColors from "./seedColors";

const styles = {
  PaletteMini: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100vw",
    color: "#ccc",
    fontSize: "18px",
    fontFamily: "Montserrat",
    background: "linear-gradient(rgba(236, 135, 135, 0.5), transparent)",
    backgroundColor: "rgb(34, 67, 156)",
    overflow: "scroll",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "50%",
    height: "40px",
    margin: "0 auto",
  },
  PaletteListContainer: {
    height: "100%",
    width: "70%",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "3%",
    cursor: "pointer",
  },

  paletteList: {
    width: "180px",
    height: "150px",
    border: "1px solid rgb(165, 167, 231)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "0.3rem",
    // overflow: hidden;
    backgroundColor: "rgb(219, 236, 217)",
    padding: "5px",
    position: "relative",
    borderRadius: "5px",
    "&:hover button": {
      opacity: "1",
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
    color: "#444",
    background: "white",
  },
  paletteBody: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "calc(100% - 14px)",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paletteSingleBox: {
    width: "20%",
    height: "25%",
  },
  paletteName: {
    backgroundColor: "transparent",
    fontWeight: "700",
    fontSize: "12px",
    margin: "0",
    "& span": {
      color: "white",
    },
  },
  closeButton: {
    position: "absolute",
    top: "1px",
    right: "1px",
    opacity: "0",
    color: " rgb(238, 228, 228)",
    borderRadius: "2px",
    background: "rgb(207, 12, 12)",
    border: "none",
    fontSize: "6px",
  },
};

function SinglePalette({ classes, history, paletteColors, deletePalette }) {
  const handleChange = (id) => {
    history.push(`/palette/${id}`);
  };
  const handleDelete = (id) => {
    console.log("Only Delete ..");
    deletePalette(id);
  };
  const paletteList = paletteColors.map((palette) => (
    <div
      key={palette.id}
      className={classes.paletteList}
      onClick={() => handleChange(palette.id)}
    >
      <div className={classes.paletteBody}>
        {palette.colors.map((color) => (
          <div
            key={color.color}
            style={{ background: `${color.color}` }}
            className={classes.paletteSingleBox}
          ></div>
        ))}
      </div>
      <div className={classes.palette}>
        <span className={classes.paletteName}>{palette.paletteName}</span>
        <span>{palette.emoji}</span>
      </div>
      <button
        className={classes.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(palette.id);
        }}
      >
        <DeleteForeverRoundedIcon />
      </button>
    </div>
  ));

  return (
    <div className={classes.PaletteMini}>
      <div className={classes.header}>
        <h4>React Colors</h4>
        <span>
          <Link to='/create-palette'>Create Palette</Link>
        </span>
      </div>
      <div className={classes.PaletteListContainer}>{paletteList}</div>
    </div>
  );
}

export default withStyles(styles)(SinglePalette);
