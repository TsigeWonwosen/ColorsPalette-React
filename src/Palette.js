import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import ColorBox from "./ColorBox";
import { generatePalette } from "./colorHelpers";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [colorType, setColorType] = useState("rgb");

  const changeLevel = (level) => {
    setLevel(level);
  };

  const handleChange = (event) => {
    setColorType(event.target.value);
  };

  let paletteArrers = palette.colors[level].map((color) => {
    return (
      <ColorBox color={color[colorType]} key={color.id} name={color.name} />
    );
  });
  return (
    <div className='Palette'>
      <div className='slider-container'>
        <div className='slider'>
          <span>Level : [ {level} ]</span>
          <Slider
            defaultValue={level}
            min={100}
            max={1000}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
        <div>
          <h4>
            {palette.paletteName} {palette.emoji}
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

      <div className='Palette-colors'>{paletteArrers}</div>
    </div>
  );
}
