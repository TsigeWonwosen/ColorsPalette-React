import React, { useState } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import ColorBox from "./ColorBox";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(5);
  const [color, setColor] = useState("rgb");

  const changeLevel = (level) => {
    setLevel(level);
  };

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  let paletteArrers = palette[level].colors.map((color) => {
    return <ColorBox color={color} key={color.name} />;
  });
  return (
    <div className='Palette'>
      <div>
        <h1>{palette[level].paletteName}</h1>
      </div>
      <div className='slider-container'>
        <div className='slider'>
          <span>Level : [ {level} ]</span>
          <Slider
            defaultValue={level}
            min={1}
            max={8}
            step={1}
            onAfterChange={changeLevel}
          />
        </div>
        <div className='color-select'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={color}
            onChange={handleChange}
          >
            <MenuItem value='rgb'>RGB - rgb(255,255,255) </MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255)</MenuItem>
            <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
          </Select>
        </div>
      </div>

      <div className='Palette-colors'>{paletteArrers}</div>
    </div>
  );
}
