import axios, { AxiosError, AxiosResponse } from 'axios';

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

// Function to retrieve transactions
async function getTransactions(offset?: number): Promise<TransactionsResponse> {
    let url = 'https://api.mainnet.hiro.so/extended/v1/tx';
  
    let allItems: Transaction[] = [];
  
    let response: AxiosResponse<TransactionsResponse>;

    let limit = 50;
  
    while (true) {

      url = 'https://api.mainnet.hiro.so/extended/v1/tx';
  
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
  
      if (offset && offset >= 500) {
        break;
      }
  
      allItems = allItems.concat(response.data.results);
      offset = offset ? offset + limit! : limit;
  
      console.log("items: ", allItems.length);
    }
  
    response.data.results = allItems;
    console.log(response.data);
    return response.data;
  }

export async function getLatestTransactions() {
    getTransactions(0);
}