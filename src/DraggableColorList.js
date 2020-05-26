import React from "react";
import DraggableColorBox from "./DraggableColorBox";

import { SortableContainer } from "react-sortable-hoc";
function DraggableColorList({ colors, deleteColor }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {colors.map((color, index) => (
        <DraggableColorBox
          color={color.color}
          key={color.name}
          name={color.name}
          deleteColor={deleteColor}
          id={color.name}
          index={index}
        />
      ))}
    </div>
  );
}
export default SortableContainer(DraggableColorList);
