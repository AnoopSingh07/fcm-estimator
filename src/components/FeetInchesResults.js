import React from 'react';
import "./Results.css";
import { useNavigate } from "react-router-dom";
import {final_total_three_m_angle, final_total_three_m_mainT, final_total_sixty_cm_grid, final_total_oneTwenty_cm_grid, final_total_sixty_by_sixty_tiles} from "./FeetInches.js";

function FeetInchesResults() {
  const navigate = useNavigate();
  const Exit = e => {
    navigate("/");
  }

  return (

    <div className='results'>
      <div className='table'>
        <div className='col1'>
          <div className='title1'><h2>Total Items</h2></div>
          <div><h3>10' Angle</h3></div>
          <div><h3>10' Main-T</h3></div>
          <div><h3>2' Grid</h3></div>
          <div><h3>4' Grid</h3></div>
          <div><h3>2'x2' Tiles</h3></div>
        </div>
        <div className='col2'>
          <div className='title2'><h2>Total Quantity</h2></div>
          <div><h3>{final_total_three_m_angle}</h3></div>
          <div><h3>{final_total_three_m_mainT}</h3></div>
          <div><h3>{final_total_sixty_cm_grid}</h3></div>
          <div><h3>{final_total_oneTwenty_cm_grid}</h3></div>
          <div><h3>{final_total_sixty_by_sixty_tiles}</h3></div>
        </div>
      </div>
      <button className="exitResult" onClick={Exit}>Exit</button>
    </div>

  )
}

export default FeetInchesResults;
