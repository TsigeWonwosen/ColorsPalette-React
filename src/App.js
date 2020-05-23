import React from "react";
import { Switch, Route } from "react-router-dom";

import SinglePalette from "./SinglePalette";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import "./App.css";
import "rc-slider/assets/index.css";
const findPalette = (id) => {
  return seedColors.find((color) => color.id === id);
};
// console.log(generatePalette(seedColors[4]));
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          {/* <Palette palette={generatePalette(seedColors[4])} /> */}
          <SinglePalette />
        </Route>
        <Route
          exact
          path='/palette/:id'
          render={(routProps) => (
            <Palette
              palette={generatePalette(findPalette(routProps.match.params.id))}
              {...routProps}
            />
          )}
        />
        <Route
          render={(props) => (
            <h1>
              Error Not Found => {`localhost:3000 ${props.location.pathname}`}
              !!!{" "}
            </h1>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
