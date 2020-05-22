import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
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
    <div>
      <NavBar
        level={level}
        colorType={colorType}
        changeLevel={changeLevel}
        handleChange={handleChange}
        {...palette}
      />
      <div className='Palette'>
        <div className='Palette-colors'>{paletteArrers}</div>
      </div>
    </div>
  );
}
