import './App.css';
import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from './components/Header.js';
import Landing from "./components/Landing.js";
import FeetInches from "./components/FeetInches.js";
import Metre from "./components/Metre.js";
import FeetInchesResults from "./components/FeetInchesResults.js";
import MetreResults from "./components/MetreResults.js";
import { Route, Routes } from "react-router";
function App() {
  const navigate = useNavigate();
  const selectDimensionFeet = e => {
    navigate("/feetInches");
  }
  const selectDimensionMetre = e => {
    navigate("/metre");
  }

  return (
    <Routes>
      <Route exact path="/" element={<>
        <div className="App Home">
            <Header/>
            <Landing selectDimensionFeet={selectDimensionFeet} selectDimensionMetre={selectDimensionMetre} />
        </div>
      </>
      } />
      <Route exact path="/feetInches" element={<>
        <div className="App">
            <Header/>            
            <FeetInches />
        </div>
      </>
      } />
      <Route exact path="/metre" element={<>
        <div className="App">
         <Header/>
         <Metre />
        </div>
      </>
      } />
      <Route exact path="/metreResults" element={<>
        <div className="App">
          <Header/>
         <MetreResults />
        </div>
      </>
      } />
      <Route exact path="/feetInchesResults" element={<>
        <div className="App">
          <Header/>
          <FeetInchesResults />
        </div>
      </>
      } />
    </Routes>

  );
}

export default App;
