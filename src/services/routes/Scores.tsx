import axios from 'axios';

interface ScoreData {
  address: string;
  date: string;
  score: number;
}

function getCurrentUtcTimestamp(): string {
  const now = new Date();
  const utcTimestamp = now.toISOString();
  return utcTimestamp;
}

export function postScore(address: string, score: number) {
  const url = 'http://localhost:3000/score';
  const scoreData: ScoreData = {
    address: address,
    date: getCurrentUtcTimestamp(),
    score: score,
  };

  try {
    axios.post(url, scoreData)
  } catch (error) {
    console.error('Error posting score:', error);
  }
}