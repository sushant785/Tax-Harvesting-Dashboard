import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchHoldingsData, fetchCapitalGains } from '../api/mockData';
import type { Holding, CapitalGainsResponse } from '../types/index';

interface PortfolioState {
  holdings: Holding[];
  baseCapitalGains: CapitalGainsResponse | null;
  selectedCoins: string[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: PortfolioState = {           //create instance of interface with default values
  holdings: [],
  baseCapitalGains: null,
  selectedCoins: [],
  status: 'idle',
  error: null,
};


export const fetchPortfolioData = createAsyncThunk(             //fetch data from both the apis
  'portfolio/fetchData',
  async () => {
    const [holdings, capitalGains] = await Promise.all([
      fetchHoldingsData(),
      fetchCapitalGains()
    ]);
    return { holdings, capitalGains };
  }
);


const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    
    toggleCoinSelection: (state, action: PayloadAction<string>) => {                // Action to toggle a single checkbox
      const coinId = action.payload;
      if (state.selectedCoins.includes(coinId)) {
        state.selectedCoins = state.selectedCoins.filter(id => id !== coinId);
      } else {
        state.selectedCoins.push(coinId);
      }
    },
    
    toggleAllCoins: (state, action: PayloadAction<boolean>) => {             // Action for the "Select All" checkbox in the header
      if (action.payload) {
        state.selectedCoins = state.holdings.map(h => h.coin);
      } else {
        state.selectedCoins = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.holdings = action.payload.holdings;
        state.baseCapitalGains = action.payload.capitalGains;
        state.selectedCoins = []; 
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { toggleCoinSelection, toggleAllCoins } = portfolioSlice.actions;
export default portfolioSlice.reducer;