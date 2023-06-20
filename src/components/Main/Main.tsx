import React from 'react'
import AddressInput from './AddressInput';
import './Main.css'

const Main: React.FC  = () => {
    
    return(
        <>
        <div className='purple-top'></div>
        <div className='main-container'>
            <div>
                <h1 className='main-title'>Stacks Score<span className="version">BETA</span></h1>
                <h3 className='main-subtitle'>A score on each stacks address based on activity</h3>
            </div>
            <AddressInput />
        </div>
        </>
        
    )
}

export default Main;