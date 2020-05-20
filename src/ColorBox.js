import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ColorBox({ color: { name, color } }) {
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);
  };
  useEffect(() => {
    setTimeout(() => setCopied(false), 1500);
  }, [copied]);
  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div className='Color-box' style={{ background: `${color}` }}>
        <div
          style={{ background: `${color}` }}
          className={`copy-overlay ${copied && "show"}`}
        ></div>
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <p>{color}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span> {name}</span>
          </div>

          <button className='copy-button'>Copy</button>
        </div>
        <span className='see-more'>More</span>
      </div>
    </CopyToClipboard>
  );
}
