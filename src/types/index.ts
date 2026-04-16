export interface CapitalGainsSummary {
  profits: number;
  losses: number;
}

export interface CapitalGainsResponse {
  capitalGains: {
    stcg: CapitalGainsSummary;
    ltcg: CapitalGainsSummary;
  };
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
}

export type SortKey = 'asset' | 'holdings' | 'value' | 'stcg' | 'ltcg';

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
} | null;