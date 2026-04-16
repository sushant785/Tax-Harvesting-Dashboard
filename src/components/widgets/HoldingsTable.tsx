import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowUpDown, ArrowDown, ArrowUp, Search } from 'lucide-react'; // CHANGED: Added Search icon
import type { RootState, AppDispatch } from '../../store/store';
import { toggleAllCoins } from '../../store/portfolioSlice';
import HoldingsTableRow from './HoldingsTableRow';
import { HoldingsTableSkeleton } from './Skeletons';
import type { SortKey, SortConfig } from '../../types/index';

const HoldingsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { holdings, selectedCoins } = useSelector((state: RootState) => state.portfolio);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = useMemo(() => {
    const filteredItems = holdings.filter(asset => 
      asset.coinName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.coin.toLowerCase().includes(searchTerm.toLowerCase())
    );

  
    const sortableItems = [...filteredItems];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: number | string = 0;
        let bValue: number | string = 0;

        switch (sortConfig.key) {
          case 'asset': aValue = a.coinName.toLowerCase(); bValue = b.coinName.toLowerCase(); break;
          case 'holdings': aValue = a.totalHolding; bValue = b.totalHolding; break;
          case 'value': aValue = a.totalHolding * a.currentPrice; bValue = b.totalHolding * b.currentPrice; break;
          case 'stcg': aValue = a.stcg.gain; bValue = b.stcg.gain; break;
          case 'ltcg': aValue = a.ltcg.gain; bValue = b.ltcg.gain; break;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig, searchTerm]);

  const visibleHoldings = isExpanded ? sortedHoldings : sortedHoldings.slice(0, 4);
  
  const isAllSelected = holdings.length > 0 && selectedCoins.length === holdings.length;
  
  const renderSortIcon = (columnKey: SortKey) => {
    
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-400" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="w-3 h-3 text-blue-600 dark:text-brand-blue" />;
    }
    return <ArrowDown className="w-3 h-3 text-blue-600 dark:text-brand-blue" />;
  };

  if (!holdings || holdings.length === 0) return <HoldingsTableSkeleton />;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Holdings</h2>
        
        <div className="flex items-center gap-4">
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 dark:border-brand-border rounded-lg bg-white dark:bg-brand-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all w-48 focus:w-64 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {sortedHoldings.length > 4 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-blue-600 dark:text-brand-blue hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              {isExpanded ? 'Show less' : 'View all'}
            </button>
          )}
        </div>
      </div>

      
      <div className="overflow-x-auto rounded-xl bg-white dark:bg-brand-card transition-colors">
        <table className="w-full text-sm text-left whitespace-nowrap">
          
          <thead className="bg-slate-50 dark:bg-brand-bg/50 text-black dark:text-slate-300 font-medium border-b border-slate-200 dark:border-brand-border text-sm">
            <tr>


              <th className="px-4 py-3 w-12 text-center"> 
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={(e) => dispatch(toggleAllCoins(e.target.checked))}
                  className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 dark:bg-slate-800 text-brand-blue focus:ring-brand-blue cursor-pointer" 
                />
              </th>
              

              <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 group transition-colors" onClick={() => handleSort('asset')}>
                <div className="flex items-center gap-1">Asset {renderSortIcon('asset')}</div>
              </th>


              <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 group transition-colors text-right" onClick={() => handleSort('holdings')}>
                <div className="flex items-center justify-end gap-1">
                  <div>Holdings <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">Market Rate</div></div>
                  {renderSortIcon('holdings')}
                </div>
              </th>


              <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 group transition-colors text-right" onClick={() => handleSort('value')}>
                <div className="flex items-center justify-end gap-1">Current Price {renderSortIcon('value')}</div>
              </th>


              <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 group transition-colors text-right" onClick={() => handleSort('stcg')}>
                <div className="flex items-center justify-end gap-1">Short-term {renderSortIcon('stcg')}</div>
              </th>


              <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 group transition-colors text-right border-r border-slate-100 dark:border-brand-border" onClick={() => handleSort('ltcg')}>
                <div className="flex items-center justify-end gap-1">Long-Term {renderSortIcon('ltcg')}</div>
              </th>


              <th className="px-4 py-3 text-right text-slate-500 dark:text-slate-400 font-medium">Amount to Sell</th>

              
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-brand-border">
            {visibleHoldings.map((asset) => (
              <HoldingsTableRow 
                key={asset.coin}
                asset={asset}
                isSelected={selectedCoins.includes(asset.coin)}
                openTooltip={openTooltip}
                setOpenTooltip={setOpenTooltip}
              />
            ))}
          </tbody>
        </table>


        {visibleHoldings.length === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            No assets found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsTable;