import React, { useState } from 'react';
import './Main.css'
import { Score, getScore } from '../../services/routes/Transactions';

const AddressInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Score | null>(null);
  const [error, setError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    setError(false);
    setLoading(true);
    console.log(inputValue);
    setInputValue('');
    const score = await getScore(inputValue);
    if (typeof score === 'string') {
      // Handle error case
      setError(true);
      console.log('Error occurred');
      setLoading(false);
    } else {
      // Handle success case
      console.log('Score:', score);
      setResult(score);
      setLoading(false);
    }
  };

  return (
    <>
    {error ? <div style={{color: 'red'}}>Whoops, there was an error.</div> : null}
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
    </>
  );
};

export default AddressInput;