import React, { useState } from 'react';
import "./FeetInches.css";
import { useNavigate } from "react-router-dom";
export let final_total_three_m_angle=0,final_total_three_m_mainT = 0, final_total_sixty_cm_grid = 0, final_total_oneTwenty_cm_grid = 0, final_total_sixty_by_sixty_tiles = 0;
let total_three_m_angle = 0, total_three_m_mainT = 0, total_sixty_cm_grid = 0, total_oneTwenty_cm_grid = 0, total_sixty_by_sixty_tiles = 0;
function FeetInches() {

    const navigate = useNavigate();
    const [dimensionvalue, setDimensionvalue] = useState({
        lf: 0,
        li: 0,
        wf: 0,
        wi: 0
    });

    const calculateMaterial = (lfi, wfi) => {
        let l = Math.floor(lfi);
        let w = Math.floor(wfi);
        let three_m_angle = 0, three_m_mainT = 0, sixty_cm_grid = 0, oneTwenty_cm_grid = 0, sixty_by_sixty_tiles = 0;

        let three_m_mainT_length, three_m_angle_length;

        //three_m_angle calculation;
        three_m_angle_length = 2 * (l + w);
        three_m_angle = Math.floor(three_m_angle_length / 300);
        if (three_m_angle_length % 300 !== 0) three_m_angle=three_m_angle+1; //ans1

        ////////////////// Width Variables //////////////////////////

        let width_sections = Math.floor(w / 60);
        let extra_width = w % 60;
        let probable_mainT_rows = width_sections - 1;
        if (extra_width !== 0) probable_mainT_rows=probable_mainT_rows+1;

        //three_m_mainT calculation;
        let mainT_rows;
        if (probable_mainT_rows % 2 !== 0) mainT_rows = Math.floor((probable_mainT_rows + 1) / 2);
        else mainT_rows = Math.floor(probable_mainT_rows / 2);

        three_m_mainT_length = l * mainT_rows;
        three_m_mainT = Math.floor(three_m_mainT_length / 300);
        if (three_m_mainT_length % 300 !== 0) three_m_mainT=three_m_mainT+1; //ans2

        /////////////////// Length Variables ////////////////////////////

        let length_sections = Math.floor(l / 60);
        let extra_length = l % 60;
        let grid_rows = length_sections - 1;
        if (extra_length !== 0) grid_rows=grid_rows=1;

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
        for (let i = 1; i <= 60; i=i+1) {
            remaining_sixty_by.set(i, 0);
        }
        let extra_required_tiles = 0;

        sixty_by_sixty_tiles = length_sections * width_sections; //ans5

        //covering extra length side
        for (let col = 1; col <= width_sections; col=col+1) {
            let found = false;
            for (let wid = extra_length; wid < 60; wid=wid+1) {
                if (remaining_sixty_by.get(wid) > 0) {
                    remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
                    remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                extra_required_tiles=extra_required_tiles+1;
                remaining_sixty_by.set(60 - extra_length, remaining_sixty_by.get(60 - extra_length) + 1);
            }
        }
        //covering extra width side
        for (let col = 1; col <= length_sections; col=col+1) {
            let found = false;
            for (let wid = extra_width; wid < 60; wid=wid+1) {
                if (remaining_sixty_by.get(wid) > 0) {
                    remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
                    remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                extra_required_tiles=extra_required_tiles+1;
                remaining_sixty_by.set(60 - extra_width, remaining_sixty_by.get(60 - extra_width) + 1);
            }
        }

        //probable corner covering case
        if (extra_length && extra_width) {
            let found = false;
            for (let wid = extra_width; wid < 60; wid=wid+1) {
                if (remaining_sixty_by.get(wid) > 0) {
                    remaining_sixty_by.set(wid, remaining_sixty_by.get(wid) - 1);
                    remaining_sixty_by.set(60 - wid, remaining_sixty_by.get(60 - wid) + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                extra_required_tiles=extra_required_tiles+1;
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

    const handleChange = e => {
        const { name, value } = e.target
        setDimensionvalue({
            ...dimensionvalue,
            [name]: value
        })
    }


    let lfi = (30.48 * (dimensionvalue.lf)) + (2.54 * (dimensionvalue.li));
    let wfi = (30.48 * (dimensionvalue.wf)) + (2.54 * (dimensionvalue.wi));
    const addMore = e => {
        if (lfi === 0 && wfi === 0) alert("Please enter dimensions value properly");
        else if (lfi === 0) alert("Please enter length value");
        else if (wfi === 0) alert("Please enter width value");
        else {
            calculateMaterial(lfi, wfi);
            setDimensionvalue({ lf: 0, li: 0, wf: 0, wi: 0 });
            navigate("/feetInches");
        }
    }
    const estimate = e => {
        if (lfi === 0 && wfi === 0) alert("Please enter dimensions value properly");
        else if (lfi === 0) alert("Please enter length value");
        else if (wfi === 0) alert("Please enter width value");
        else {
            calculateMaterial(lfi, wfi);
            final_total_three_m_angle = total_three_m_angle; final_total_three_m_mainT = total_three_m_mainT; final_total_sixty_cm_grid = total_sixty_cm_grid; final_total_oneTwenty_cm_grid = total_oneTwenty_cm_grid; final_total_sixty_by_sixty_tiles = total_sixty_by_sixty_tiles;
            navigate("/feetInchesResults");
            total_three_m_angle = 0; total_three_m_mainT = 0; total_sixty_cm_grid = 0; total_oneTwenty_cm_grid = 0; total_sixty_by_sixty_tiles = 0;
            setDimensionvalue({ lf: 0, li: 0, wf: 0, wi: 0 });
        }
    }
    const Exit = e => {
        let exit = window.confirm("Want to exit without estimating material?");
        if (exit) {
            setDimensionvalue({ lf: 0, li: 0, wf: 0, wi: 0 });
            navigate("/");
            total_three_m_angle = 0; total_three_m_mainT = 0; total_sixty_cm_grid = 0; total_oneTwenty_cm_grid = 0; total_sixty_by_sixty_tiles = 0;
        }
    }
    return (
        <>  <div className='landing'>
            <div className='instruction'><h2>Enter Dimensions in feet/inches</h2></div>
            <div className='dimension'>
                <h3>Enter Length : </h3>
                <div>
                    <div className='inputTag'><input type="number" name="lf" value={dimensionvalue.lf} onChange={handleChange} className="dimensionInput" placeholder="feet" /><span>feet</span></div>
                    <div className='inputTag'><input type="number" name="li" value={dimensionvalue.li} onChange={handleChange} className="dimensionInput" placeholder="inches" /><span>inches</span></div>
                </div>
            </div>
            <div className='dimension'>
                <h3>Enter Width : </h3>
                <div>
                <div className='inputTag'><input type="number" name="wf" value={dimensionvalue.wf} onChange={handleChange} className="dimensionInput" placeholder="feet" /><span>feet</span></div>
                <div className='inputTag'><input type="number" name="wi" value={dimensionvalue.wi} onChange={handleChange} className="dimensionInput" placeholder="inches" /><span>inches</span></div>
                </div>
            </div>
            <div className='dimensionButtons'>
                <div className='twoBtn'><button className="add_more" onClick={addMore}>Add more dimensions</button>
                <button className="estimate" onClick={estimate}>Estimate material</button></div>
                <button className="exit" onClick={Exit}>Exit</button>
            </div>
            </div>
        </>
    )
}

export default FeetInches
