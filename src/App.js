import React from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";

import "./App.css";

function App() {
  return (
    <div>
      <Palette palette={seedColors[4]} />
    </div>
  );
}

export default App;
