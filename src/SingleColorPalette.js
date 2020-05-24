import React from "react";

export default function SingleColorPalette(props) {
  const { id, colorId } = props.match.params;
  return (
    <div>
      <h3>
        {" "}
        SingleColorPalette ColorId : {id} - PaletteId : {colorId}
      </h3>
    </div>
  );
}
