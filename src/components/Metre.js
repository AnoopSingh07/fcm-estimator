import React, { useState } from 'react';
import "./Metre.css";
import { useNavigate } from "react-router-dom";
export let final_total_three_m_angle=0,final_total_three_m_mainT = 0, final_total_sixty_cm_grid = 0, final_total_oneTwenty_cm_grid = 0, final_total_sixty_by_sixty_tiles = 0;
let total_three_m_angle = 0, total_three_m_mainT = 0, total_sixty_cm_grid = 0, total_oneTwenty_cm_grid = 0, total_sixty_by_sixty_tiles = 0;
function Metre() {

  const navigate = useNavigate();
  const [dimensionvalue, setDimensionvalue] = useState({
    lf: 0,
    wf: 0
  })

  const calculateMaterial = (lfi, wfi) => {
    let l = Math.floor(lm);
    let w = Math.floor(wm);
    let three_m_angle = 0, three_m_mainT = 0, sixty_cm_grid = 0, oneTwenty_cm_grid = 0, sixty_by_sixty_tiles = 0;

    let three_m_mainT_length, three_m_angle_length;

    //three_m_angle calculation;
    three_m_angle_length = 2 * (l + w);
    three_m_angle = Math.floor(three_m_angle_length / 300);
    if (three_m_angle_length % 300 !== 0) three_m_angle += 1; //ans1

    ////////////////// Width Variables //////////////////////////

    let width_sections = Math.floor(w / 60);
    let extra_width = w % 60;
    let probable_mainT_rows = width_sections - 1;
    if (extra_width !== 0) probable_mainT_rows++;

    //three_m_mainT calculation;
    let mainT_rows;
    if (probable_mainT_rows % 2 !== 0) mainT_rows = Math.floor((probable_mainT_rows + 1) / 2);
    else mainT_rows = Math.floor(probable_mainT_rows / 2);

    three_m_mainT_length = l * mainT_rows;
    three_m_mainT = Math.floor(three_m_mainT_length / 300);
    if (three_m_mainT_length % 300 !== 0) three_m_mainT++; //ans2

    /////////////////// Length Variables ////////////////////////////

    let length_sections = Math.floor(l / 60);
    let extra_length = l % 60;
    let grid_rows = length_sections - 1;
    if (extra_length !== 0) grid_rows++;

    //oneTwenty_cm_grid calculation;
    //grid part can be used only once at angle sides//
    //for the requirement of less than 30cm grid remainders of 30cm+ can be used//
    //means waste grid will be less than 60cm only (even after using some of them)//

    let sixty_cm_grid_at_angle_side = 0;
    let thirty_cm_side_reusable_grid_requirements = 0;
    let thirty_cm_side_reusable_grid_remains = 0;
    let conditional_grid_column = 0;

    //if 1 widthSection only
    if (mainT_rows < 1) {
      if (extra_width <= 30) {
        thirty_cm_side_reusable_grid_requirements += grid_rows;
        // thirty_cm_side_reusable_grid_remains=grid_rows;//check this
      } else sixty_cm_grid_at_angle_side = grid_rows;
    } else {
      sixty_cm_grid_at_angle_side = grid_rows;
      oneTwenty_cm_grid = (mainT_rows - 1) * grid_rows; //ans4
      let extra_width_remainder_check = (w - 60) % 120;
      if (extra_width_remainder_check !== 0) {
        if (extra_width_remainder_check <= 30) {
          thirty_cm_side_reusable_grid_requirements += grid_rows;
        } else if (extra_width_remainder_check > 30 && extra_width_remainder_check <= 60) {
          sixty_cm_grid_at_angle_side += grid_rows;
        } else if (extra_width_remainder_check > 60 && extra_width_remainder_check <= 90) {
          oneTwenty_cm_grid += grid_rows; //ans4
          thirty_cm_side_reusable_grid_remains += grid_rows;
          conditional_grid_column = 1;
        } else if (extra_width_remainder_check > 90 && extra_width_remainder_check <= 120) {
          oneTwenty_cm_grid = oneTwenty_cm_grid + grid_rows; //ans4
          conditional_grid_column = 1;
        }
      }
    }
    //sixty_cm_grid calculation;
    let sixty_cm_grid_column_wise = 0;
    let grid_columns = mainT_rows - 1 + conditional_grid_column;
    if (extra_length <= 30) {
      thirty_cm_side_reusable_grid_requirements += grid_columns;
    } else {
      sixty_cm_grid_column_wise += grid_columns;
    }
    sixty_cm_grid_column_wise += length_sections * grid_columns;
    let thirty_cm_grid_requirements_after_using_remainents = 0;
    if (thirty_cm_side_reusable_grid_requirements >= thirty_cm_side_reusable_grid_remains) {
      thirty_cm_grid_requirements_after_using_remainents = Math.floor((thirty_cm_side_reusable_grid_requirements + 1) / 2);
    }

    sixty_cm_grid = sixty_cm_grid_at_angle_side + sixty_cm_grid_column_wise + thirty_cm_grid_requirements_after_using_remainents; //ans3

    //sixty_by_sixty_tiles calculation;
    let remaining_sixty_by = new Map();
    for (let i = 1; i <= 60; ++i) {
      remaining_sixty_by.set(i, 0);
    }
    let extra_required_tiles = 0;

    sixty_by_sixty_tiles = length_sections * width_sections; //ans5

    //covering extra length side
    for (let col = 1; col <= width_sections; ++col) {
      let found = false;
      for (let wid = extra_length; wid < 60; wid++) {
        if (remaining_sixty_by.get(wid) > 0) {
          remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
          remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
          found = true;
          break;
        }
      }
      if (!found) {
        extra_required_tiles++;
        remaining_sixty_by.set(60 - extra_length, remaining_sixty_by.get(60 - extra_length) + 1);
      }
    }
    //covering extra width side
    for (let col = 1; col <= length_sections; ++col) {
      let found = false;
      for (let wid = extra_width; wid < 60; wid++) {
        if (remaining_sixty_by.get(wid) > 0) {
          remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
          remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
          found = true;
          break;
        }
      }
      if (!found) {
        extra_required_tiles++;
        remaining_sixty_by.set(60 - extra_width, remaining_sixty_by.get(60 - extra_width) + 1);
      }
    }

    //probable corner covering case
    if (extra_length && extra_width) {
      let found = false;
      for (let wid = extra_width; wid < 60; wid++) {
        if (remaining_sixty_by.get(wid) > 0) {
          remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
          remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
          found = true;
          break;
        }
      }
      if (!found) {
        extra_required_tiles++;
        remaining_sixty_by.set(60 - extra_width, remaining_sixty_by.get(60 - extra_width) + 1);
      }
    }

    if (extra_length || extra_width) {
      sixty_by_sixty_tiles = sixty_by_sixty_tiles + extra_required_tiles; //ans5
    }
    ////////////////////// update total answers //////////////////////////

    total_oneTwenty_cm_grid += oneTwenty_cm_grid;
    total_sixty_by_sixty_tiles += sixty_by_sixty_tiles;
    total_sixty_cm_grid += sixty_cm_grid;
    total_three_m_angle += three_m_angle;
    total_three_m_mainT += three_m_mainT;

      /////////////////////// Completed /////////////////////////////
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setDimensionvalue({
      ...dimensionvalue,
      [name]: value
    });
  }
  let lm = (dimensionvalue.lf) * 100;
  let wm = (dimensionvalue.wf) * 100;
  const addMore = e => {
    if (lm === 0 && wm === 0) alert("Please enter dimensions value properly");
    else if (lm === 0) alert("please enter length value properly");
    else if (wm === 0) alert("please enter width value properly");
    else {
      calculateMaterial(lm, wm);
      setDimensionvalue({ lf: 0, wf: 0 });
      navigate("/metre");
    }
  }
  const estimate = e => {
    if (lm === 0 && wm === 0) alert("Please enter dimensions value properly");
    else if (lm === 0) alert("please enter length value properly");
    else if (wm === 0) alert("please enter width value properly");
    else {
      calculateMaterial(lm, wm);
      final_total_three_m_angle = total_three_m_angle; final_total_three_m_mainT = total_three_m_mainT; final_total_sixty_cm_grid = total_sixty_cm_grid; final_total_oneTwenty_cm_grid = total_oneTwenty_cm_grid; final_total_sixty_by_sixty_tiles = total_sixty_by_sixty_tiles;
      navigate("/metreResults");
      total_three_m_angle = 0; total_three_m_mainT = 0; total_sixty_cm_grid = 0; total_oneTwenty_cm_grid = 0; total_sixty_by_sixty_tiles = 0;
      setDimensionvalue({ lf: 0, wf: 0 });
    }
  }
  const Exit = e => {
    let exit = window.confirm("Want to exit without estimating material?");
    if (exit) {
      setDimensionvalue({ lf: 0, wf: 0 });
      navigate("/");
      total_three_m_angle = 0; total_three_m_mainT = 0; total_sixty_cm_grid = 0; total_oneTwenty_cm_grid = 0; total_sixty_by_sixty_tiles = 0;
    }
  }

  return (
    <>
      <div className='landing'>
        <div><h2>Enter dimensions in metre</h2></div>
        <div className='inputSection'>
          <div className='inputLine'>
            <h3>Enter Length in m : </h3>
            <input type="number" name="lf" value={dimensionvalue.lf} onChange={handleChange} className="dimensionInput" placeholder="(in metre)" />
          </div>
          <div className='inputLine' >
            <h3 className='wid'>Enter Width in m: </h3>
            <input type="number" name="wf" value={dimensionvalue.wf} onChange={handleChange} className="dimensionInput" placeholder="(in metre)" />
          </div>
        </div>
        <div className='btnSection'>
          <div className='twoBtn'><button className="add_more" onClick={addMore}>Add more dimensions</button>
            <button className="estimate" onClick={estimate}>Estimate material</button></div>
          <button className="exit" onClick={Exit}>Exit</button>
        </div>
      </div>
    </>
  )
}

export default Metre
