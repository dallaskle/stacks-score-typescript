import React, {useState} from 'react'
import './Main.css'
import { Score } from '../../services/routes/Transactions';

interface ScoreDetailsProps {
    score: Score | null; // Update the prop type to accept Score or null
  }

const ScoreDetails: React.FC<ScoreDetailsProps>  = ({score}) => {

    const [show, setShow] = useState<Boolean>(false);

    const handleShow = () => {
        setShow(!show);
    }
    
    return(
        <div className=''>
            
            {show ? <div className='stacks-score-detail-item-div'>
                <div>{score?.totalTransactions} total transactions</div>
                <div>{score?.numberOfAddresses} addresses transacted with</div>
                <div>{score?.numberOfActiveDays} days with a transaction</div>
            </div> : null}
            <div><button className='stacks-score-detail-button' onClick={handleShow}>{show ? 'Hide' :  "Where'd this score come from?"}</button></div>
        </div>
    )
}

export default ScoreDetails;