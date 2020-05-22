import React from "react";
import { Link, withRouter } from "react-router-dom";
import Slider from "rc-slider";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./NavBar.css";

function NavBar({
  level,
  handleChange,
  changeLevel,
  colorType,
  paletteName,
  emoji,
}) {
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
            onChange={handleChange}
          >
            <MenuItem value='rgb'>RGB - rgb(255,255,255) </MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,0.1)</MenuItem>
            <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
          </Select>
        </div>
      </div>
    </header>
  );
}
export default withRouter(NavBar);
