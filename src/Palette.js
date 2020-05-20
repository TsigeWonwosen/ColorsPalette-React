import React from "react";
import ColorBox from "./ColorBox";

export default function Palette({ palette }) {
  let paletteArrers = palette.colors.map((color) => {
    return <ColorBox color={color} key={color.name} />;
  });
  return (
    <div className='Palette'>
      <h1>{palette.paletteName}</h1>
      <div className='Palette-colors'>{paletteArrers}</div>
    </div>
  );
}
