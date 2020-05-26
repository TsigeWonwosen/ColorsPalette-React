import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import SinglePalette from "./SinglePalette";
import SingleColorPalette from "./SingleColorPalette";
import Palette from "./Palette";
import CreatePalette from "./CreatePalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import "./App.css";
import "rc-slider/assets/index.css";

function App() {
  const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [paletteColors, setPaletteColor] = useState(savePalettes || seedColors);

  const findPalette = (id) => {
    return paletteColors.find((color) => color.id === id);
  };

  const addNewPalette = (newPalette) => {
    setPaletteColor((prevState) => [newPalette, ...prevState]);
  };

  useEffect(() => {
    function syncLocalStorage() {
      window.localStorage.setItem("palettes", JSON.stringify(paletteColors));
    }
    syncLocalStorage();
  }, [paletteColors]);

  function deletePalette(id) {
    let newColors = paletteColors.filter((color) => color.id !== id);
    console.log(paletteColors.filter((color) => color.id === id));
    setPaletteColor(newColors);
  }
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => (
            <SinglePalette
              {...props}
              paletteColors={paletteColors}
              deletePalette={deletePalette}
            />
          )}
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
              palette={paletteColors}
              // palette={generatePalette(findPalette(routProps.match.params.id))}
              {...routProps}
            />
          )}
        />
        <Route
          exact
          path='/create-palette/'
          render={(routProps) => (
            <CreatePalette
              {...routProps}
              paletteColors={paletteColors}
              addNewPalette={addNewPalette}
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
