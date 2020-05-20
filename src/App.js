import React from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";

import "./App.css";
import "rc-slider/assets/index.css";

function App() {
  return (
    <div>
      <Palette palette={seedColors} />
    </div>
  );
}

export default App;
