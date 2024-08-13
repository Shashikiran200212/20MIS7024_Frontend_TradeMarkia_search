import axios from 'axios';

interface SearchParams {
  input_query: string;
  input_query_type: string;
  sort_by: string;
  status: any[];
  exact_match: boolean;
  date_query: boolean;
  owners: any[];
  attorneys: any[];
  law_firms: any[];
  mark_description_description: any[];
  classes: any[];
  page: number;
  rows: number;
  sort_order: string;
  states: any[];
  counties: any[];
}

export const basicSearch = async (params: SearchParams) => {
  try {
    const response = await axios.post('https://vit-tm-task.api.trademarkia.app/api/v3/us', params);
    return response.data; // Ensure you return the correct data structure
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; // Rethrow to handle it in the component
  }
};
