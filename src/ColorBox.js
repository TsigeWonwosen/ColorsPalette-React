import React from "react";

export default function colorBox({ color: { name, color } }) {
  return (
    <div className='Color-box' style={{ background: `${color}` }}>
      <div className='copy-container'>
        <div className='box-content'>
          <span> {name}</span>
        </div>

        <button className='copy-button'>Copy</button>
      </div>
      <span className='see-more'>More</span>
    </div>
  );
}
