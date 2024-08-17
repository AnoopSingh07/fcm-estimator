import React from 'react'
import "./Landing.css";
function Landing(props) {

    let {selectDimensionFeet, selectDimensionMetre}=props;

  return (
    <div className='landing'>
      <h3>Have dimensions in</h3>
      <button onClick={selectDimensionFeet} className="dimension">Feet/Inches</button>
      <h3>or</h3>
      <button onClick={selectDimensionMetre} className="dimension">Metre</button>
      <h3>?</h3>
    </div>
  )
}

export default Landing;
