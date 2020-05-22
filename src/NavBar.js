import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Slider from "rc-slider";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "rc-slider/assets/index.css";
import "./NavBar.css";

function NavBar({ level, handleChange, changeLevel, paletteName, emoji }) {
  const [open, setOpen] = useState(false);
  const [colorType, setColorType] = useState("rgb");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleColorChange = (e) => {
    setColorType(e.target.value);
    handleChange(e.target.value);
    handleClick();
  };
  return (
    <header className='Navbar'>
      <div className='logo'>
        <Link to='/' className='link'>
          ColorsPalette
        </Link>
      </div>
      <div className='slider-container'>
        <div className='slider'>
          <span>Level : [ {level} ]</span>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
        <div>
          <h4>
            {paletteName} {emoji}
          </h4>
        </div>
        <div className='color-select'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={colorType}
            onChange={handleColorChange}
          >
            <MenuItem value='rgb'>RGB - rgb(255,255,255) </MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,0.1)</MenuItem>
            <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
          </Select>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={
          <span id='message-id'>
            Color Format Changed to - {colorType.toUpperCase()}
          </span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClick={handleClose}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </header>
  );
}
export default withRouter(NavBar);
