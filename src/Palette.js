import React, { useState } from "react";
// import Button from "@material-ui/core/Button";

import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
// import { generatePalette } from "./colorHelpers";

export default function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [colorType, setColorType] = useState("rgb");

  const changeLevel = (level) => {
    setLevel(level);
  };

  const handleChange = (value) => {
    setColorType(value);
  };

  let paletteArrays = palette.colors[level].map((color) => {
    return (
      <ColorBox
        color={color[colorType]}
        key={color.id}
        name={color.name}
        id={color.id}
        paletteId={palette.id}
      />
    );
  });
  return (
    <div className='Palette'>
      <NavBar
        level={level}
        colorType={colorType}
        changeLevel={changeLevel}
        handleChange={handleChange}
        {...palette}
      />
      <div className='Palette-colors'>{paletteArrays}</div>
      <footer className='Palette-footer'>
        {palette.paletteName}
        <span>{palette.emoji}</span>
      </footer>
    </div>
  );
}
