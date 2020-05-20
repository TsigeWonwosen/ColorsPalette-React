import React from "react";

export default function colorBox({ color }) {
  return (
    <div className='Color-box' style={{ background: `${color.color}` }}>
      <span> {color.name}</span>
      <span className='more'>
        <button>Copy</button>
      </span>
    </div>
  );
}
