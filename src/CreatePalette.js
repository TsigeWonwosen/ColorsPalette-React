import React from "react";

export default function CreatePalette(props) {
  return (
    <div>
      <button onClick={() => props.history.push("/")}> Back</button>
      <h1>Create Palette ...</h1>
    </div>
  );
}
