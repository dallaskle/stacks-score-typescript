import axios, { AxiosError, AxiosResponse } from 'axios';
import { postScore } from './Scores';

interface Transaction {
  sender_address: string;
  token_transfer?: {
    recipient_address: string;
  };
  contract_call?: {
    contract_id: string;
  };
  smart_contract?: {
    contract_id: string;
  };
  burn_block_time_iso: string;
}

interface TransactionsResponse {
  total: number;
  results: Transaction[];
}

export interface Score {
  totalTransactions: number;
  numberOfAddresses: number;
  numberOfActiveDays: number;
  principal: string;
  totalScore: number;
}

// Function to retrieve transactions
async function getTransactions(principal: string, limit?: number, offset?: number): Promise<TransactionsResponse> {
  let url = `https://api.mainnet.hiro.so/extended/v1/address/${principal}/transactions`;

  let allItems: Transaction[] = [];

  let response: AxiosResponse<TransactionsResponse>;

  while (true) {
    url = `https://api.mainnet.hiro.so/extended/v1/address/${principal}/transactions`;

    if (limit && offset) {
      url = url + `?limit=${limit}&offset=${offset}`;
    } else if (limit) {
      url = url + `?limit=${limit}`;
    } else if (offset) {
      url = url + `?offset=${offset}`;
    }

    try {
      response = await axios.get<TransactionsResponse>(url);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error retrieving transactions:', axiosError.message);
      throw error;
    }

    if (response.data.results.length === 0) {
      // No more items, exit the loop
      break;
    }

    if (offset && offset >= 5000) {
      break;
    }

    allItems = allItems.concat(response.data.results);
    offset = offset ? offset + limit! : limit;

    console.log("items: ", allItems.length);
  }

  response.data.results = allItems;
  return response.data;
}

function countAddressesTransactedWith(transactions: Transaction[], principal: string): number {
  if (!transactions || transactions.length === 0) {
    return 0;
  }

  let address: string[] = [];
  transactions.map(t => {
    //console.log(t)
    // if called by == principal
    if (t.sender_address === principal) {
      let thisAddress: string = "";
      if (t.token_transfer) {
        thisAddress = t.token_transfer.recipient_address;
      } else if (t.contract_call) {
        thisAddress = t.contract_call.contract_id;
      } else if (t.smart_contract) {
        thisAddress = t.smart_contract.contract_id;
      }
      if (!address.includes(thisAddress)) {
        address.push(thisAddress);
      }
    } else {
      let thisAddress = t.sender_address;
      if (!address.includes(thisAddress)) {
        address.push(thisAddress);
      }
    }
    // count the contract as the address
    // else count the called by address as the interactor?
  });
  return address.length;
}

function countActiveDays(transactions: Transaction[]): number {
  if (!transactions || transactions.length === 0) {
    return 0;
  }

  let days: string[] = [];
  transactions.map(t => {
    let dateString = t.burn_block_time_iso.substring(0, 10);
    if (!days.includes(dateString)) {
      days.push(dateString);
    }
    // get day
    // if days doesn't includes day
    // add to array
  });
  return days.length;
}

console.log('running');

// Example usage
//const principal = 'SP3QJ41PARX6F6B4H56JZ272ANK0TRJ9J2VFBVY1D'; //phillip.btc //'SP1ARWZD4G0SZPADBFQ5DVSK93B6QKQ6DHK9G452P' //binaya.btc 'SP2MDB1P998APGAWC8NAQKFEH13KMMPNRWJR8AVM4' //albertliang.btc //'SPYF9PC72BSWS0DGA33FR24GCG81MG1Z96463H68' //orlando.btc //'SP000000000000000000002Q6VF78.bns' //bns contract //'SP132QXWFJ11WWXPW4JBTM9FP6XE8MZWB8AF206FX' //muneeb.btc //'SP2TK8RSW7NVMEV56WCD5TQHSYC8ZHG36G5D527BY' //me;
let transactionList: Transaction[] = [];

let totalTransactions = 0;

export async function getScore(principal: string) {
  try {
    const transactions = await getTransactions(principal, 50, 0);
    totalTransactions = transactions.total === 0 ? transactions.results.length : transactions.total;
    transactionList = transactions.results;
    const numberOfAddresses: number = countAddressesTransactedWith(transactionList, principal);
    const numberOfActiveDays: number = countActiveDays(transactionList);
    const totalScore: number = totalTransactions + numberOfActiveDays + numberOfAddresses;
    console.log("Total Transactions: ", totalTransactions);
    console.log("Number of Different Addresses/Contracts interacted with: ", numberOfAddresses);
    console.log("Number of active days: ", numberOfActiveDays);
    const newScore: Score = {
      totalTransactions: totalTransactions,
      numberOfAddresses: numberOfAddresses,
      numberOfActiveDays: numberOfActiveDays,
      principal: principal,
      totalScore: totalScore,
    };
    postScore(principal, newScore.totalScore);
    return newScore;
  } catch(error) {
    console.error('Error:', error);
    return "error";
  };
}
