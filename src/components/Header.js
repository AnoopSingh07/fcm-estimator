import React from 'react';
import Logo from "../fce_logo.png";
import "../App.css";
function Header() {
    return (<>
        <header className="App-header">
            <img className='logo' src={Logo} alt="logo" />
            <div className='heading'>
                <h2>False-Ceiling Material</h2>
                <h2>Estimator</h2>
            </div>
        </header>
    </>
    )
}

export default Header
