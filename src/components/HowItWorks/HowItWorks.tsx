import React from 'react'
import './HowItWorks.css'
import Date from '../../assets/images/stacks_score_date_icon.png'
import Address from '../../assets/images/stacks_score_address_icon.png'
import Transaction from '../../assets/images/stacks_score_transaction_icon.png'

const HowItWorks: React.FC  = () => {
    
    return(
        <div className='hiw-container'>
                <h2 className='hiw-title'>How does it work?</h2>
                <h4 className='hiw-subtitle'>Get points for onchain activity</h4>
                <div className='hiw-list'>
                    <div className='hiw-card'>
                        <div className='hiw-card-points'>1x point</div>
                        <img className='hiw-card-image' src={Transaction} alt="transaction_image" />
                        <div className='hiw-card-desc'>Each Onchain Transaction</div>
                    </div>
                    <div className='hiw-card'>
                        <div className='hiw-card-points'>1x point</div>
                        <img className='hiw-card-image' src={Date} alt="date_image" />
                        <div className='hiw-card-desc'>Each Unique Day of Activity</div>
                    </div>
                    <div className='hiw-card'>
                        <div className='hiw-card-points'>1x point</div>
                        <img className='hiw-card-image' src={Address} alt="address_image" />
                        <div className='hiw-card-desc'>Each Address Transacted with</div>
                    </div>
                </div>
        </div>
    )
}

export default HowItWorks;