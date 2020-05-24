import React from "react";
import { Switch, Route } from "react-router-dom";

import SinglePalette from "./SinglePalette";
import SingleColorPalette from "./SingleColorPalette";
import Palette from "./Palette";
import CreatePalette from "./CreatePalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import "./App.css";
import "rc-slider/assets/index.css";
const findPalette = (id) => {
  return seedColors.find((color) => color.id === id);
};

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <SinglePalette {...props} />}
        />
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
          exact
          path='/palette/:id/:colorId'
          render={(routProps) => (
            <SingleColorPalette
              palette={seedColors}
              // palette={generatePalette(findPalette(routProps.match.params.id))}
              {...routProps}
            />
          )}
        />
        <Route
          exact
          path='/create-palette/'
          render={(routProps) => <CreatePalette {...routProps} />}
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
