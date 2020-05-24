import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";

const styles = {
  copyText: {
    color: (props) =>
      chroma(props.color).luminance() <= 0.09 ? "white" : "black",
  },
  colorName: {
    color: (props) =>
      chroma(props.color).luminance() >= 0.2 ? "black" : "white",
  },
};

function ColorBox({ name, color, id, paletteId, classes }) {
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);
  };
  useEffect(() => {
    setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  const isDarkColor = chroma(color).luminance() <= 0.09;
  const isLightColor = chroma(color).luminance() >= 0.2;

  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div className='Color-box' style={{ background: `${color}` }}>
        <div
          style={{ background: `${color}` }}
          className={`copy-overlay ${copied && "show"}`}
        ></div>
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={isLightColor && "dark-text"}>{color}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={classes.copyText}> {name}</span>
          </div>

          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        <Link
          to={`/palette/${id}/${paletteId}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={`see-more ${isLightColor && "dark-text"}`}>
            MORE
          </span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
export default withStyles(styles)(ColorBox);
