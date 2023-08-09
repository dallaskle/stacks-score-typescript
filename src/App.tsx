import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main'
import HowItWorks from './components/HowItWorks/HowItWorks';
import LatestSearches from './components/Searches/LatestSearches';
import { getLatestTransactions } from './services/Testing/AllTransactions';

function App() {
  
  useEffect(() => {
    getLatestTransactions();
  },[])

  return (
    <div className="App">
      <Main />
      <HowItWorks />
      <div style={{color: 'white', padding: '40px', paddingTop: '100px', fontSize: '20px'}}>
        <strong>Thank you for trying out Stacks Score.</strong> <br /><br />
        You can get your address a higher score by doing more onchain transactions. <br /><br />
        This is a very early version, but if people like it, you could earn NFTs by achieving a certain score. <br /><br />
        Let me know what you think <br /><br />
        Twitter: <a href='https://twitter.com/bydallas_'>@bydallas_</a> 
        <br />Email: dallasjklein@gmail.com

      </div>
    </div>
  );
}

export default App;
