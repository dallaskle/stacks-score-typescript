import React, { useState } from 'react';
import './Main.css'
import { Score, getScore } from '../../services/routes/Transactions';
//import { getAnalytics, logEvent } from "firebase/analytics";
import ScoreDetails from './ScoreDetails';

const AddressInput: React.FC = () => {
  //const analytics = getAnalytics();

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Score | null>(null);
  const [error, setError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue) {
      //logEvent(analytics, 'get_score', { address: inputValue});
    }
    setError(false);
    setLoading(true);
    console.log(inputValue);
    
    const score = await getScore(inputValue);

    if (typeof score === 'string') {
      // Handle error case
      setError(true);
      console.log('Error occurred');
      setLoading(false);
      //logEvent(analytics, 'get_score_fail', { address: inputValue});
    } else {
      // Handle success case
      console.log('Score:', score);
      setResult(score);
      setLoading(false);
      //logEvent(analytics, 'get_score_success', { address: inputValue});
    }
    setInputValue('');
  };

  return (
    <>

    {error ? <div style={{color: 'red', marginBottom: '-0.9rem'}}>Whoops, there was an error.</div> : null}

    <div className="input-box">
      <input className="input-box" type="text" value={inputValue} onChange={handleInputChange} placeholder='Enter address: SP2TK8RSW7NVMEV56WCD5TQHSYC8ZHG36G5D527BY' />
      <button className='input-submit-button' onClick={handleSubmit}>{loading ? '  Loading  ' : 'Get Score'}</button>
    </div>

    {result ? 
      <div className='stacks-score-box'>
        Stacks Score for {result.principal.substring(0,6)}...{result.principal.substring(result.principal.length - 6,result.principal.length)} 
        <div className='stacks-score-total'>{result.totalScore}</div>
      </div>
    : null}

    {result ? <ScoreDetails score={result} /> : null}
    </>
  );
};

export default AddressInput;