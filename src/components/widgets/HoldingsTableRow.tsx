import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCoinSelection } from '../../store/portfolioSlice';
import type { AppDispatch } from '../../store/store';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatters';
import type { Holding } from '../../types'; 
import { smartFormat } from '../../utils/formatters';

interface HoldingsTableRowProps {
  asset: Holding;
  isSelected: boolean;
  openTooltip: string | null;
  setOpenTooltip: (val: string | null) => void;
}

const tooltipClasses = "absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 p-3 text-xs text-white bg-slate-900 dark:bg-slate-800 dark:border-slate-700 rounded-lg shadow-xl whitespace-nowrap z-10";
const arrowClasses = "absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-slate-900 dark:border-l-slate-800";

const HoldingsTableRow: React.FC<HoldingsTableRowProps> = ({ asset, isSelected, openTooltip, setOpenTooltip }) => {
  const dispatch = useDispatch<AppDispatch>();
  const totalValue = asset.totalHolding * asset.currentPrice;

  return (
    <tr className={`transition-colors group ${isSelected ? 'bg-blue-50/40 dark:bg-brand-blue/10 hover:bg-blue-50/70 dark:hover:bg-brand-blue/20' : 'hover:bg-slate-50/80 dark:hover:bg-white/5'}`}>
      <td className="px-4 py-4 text-center">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => dispatch(toggleCoinSelection(asset.coin))}
          className="w-4 h-4 cursor-pointer rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-brand-blue dark:ring-offset-slate-900 transition-transform duration-200 hover:scale-110 active:scale-95" 
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 rounded-full bg-slate-100 dark:bg-brand-bg flex items-center justify-center border border-slate-200 dark:border-brand-border overflow-hidden shadow-sm">
            <img 
              src={asset.logo} 
              alt={asset.coinName} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.insertAdjacentHTML(
                  'beforeend', 
                  `<span class="text-xs font-bold text-slate-500 dark:text-slate-400">${asset.coinName.charAt(0)}</span>`
                );
              }} 
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {asset.coinName}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{asset.coin}</div>
          </div>
        </div>
      </td>

      
      <td className="px-4 py-4 text-right">
        <div className="flex flex-col items-end">
          <div className="relative group/tooltip" onMouseEnter={() => setOpenTooltip(`holding-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className="font-medium text-gray-900 dark:text-slate-100">{smartFormat(asset.totalHolding)} {asset.coin}</div>
            {openTooltip === `holding-${asset.coin}` && (
              <div className={tooltipClasses}>
                {smartFormat(asset.totalHolding)} {asset.coin}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
          <div className="relative group/tooltip mt-0.5" onMouseEnter={() => setOpenTooltip(`price-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className="text-xs text-slate-400 dark:text-slate-500">{asset.currentPrice < 1? formatCurrency(asset.currentPrice):formatCompactCurrency(asset.currentPrice)}/{asset.coin}</div>
            {openTooltip === `price-${asset.coin}` && (
              <div className={tooltipClasses}>
                {formatCurrency(asset.currentPrice)}/{asset.coin}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
        </div>
      </td>

      
      <td className="px-4 py-4 text-right font-semibold text-gray-900 dark:text-slate-100">
        <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip(`value-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
          <span>{formatCompactCurrency(totalValue)}</span>
          {openTooltip === `value-${asset.coin}` && (
            <div className={tooltipClasses}>
              {formatCurrency(totalValue)}
              <div className={arrowClasses} />
            </div>
          )}
        </div>
      </td>

      
      <td className="px-4 py-4 text-right">
        <div className="flex flex-col items-end">
          <div className="relative group/tooltip" onMouseEnter={() => setOpenTooltip(`stcg-gain-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className={`font-medium ${asset.stcg.gain < 0 ? 'text-red-500 dark:text-red-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
              {asset.stcg.gain > 0 ? '+' : ''}{formatCompactCurrency(asset.stcg.gain)}
            </div>
            {openTooltip === `stcg-gain-${asset.coin}` && (
              <div className={tooltipClasses}>
                {formatCurrency(asset.stcg.gain)}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
          <div className="relative group/tooltip mt-0.5" onMouseEnter={() => setOpenTooltip(`stcg-bal-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className="text-xs text-slate-400 dark:text-slate-500">{asset.stcg.balance.toFixed(3)} {asset.coin}</div>
            {openTooltip === `stcg-bal-${asset.coin}` && (
              <div className={tooltipClasses}>
                {asset.stcg.balance.toString()} {asset.coin}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
        </div>
      </td>

      
      <td className="px-4 py-4 text-right">
        <div className="flex flex-col items-end">
          <div className="relative group/tooltip" onMouseEnter={() => setOpenTooltip(`ltcg-gain-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className={`font-medium ${asset.ltcg.gain < 0 ? 'text-red-500 dark:text-red-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
              {asset.ltcg.gain > 0 ? '+' : ''}{formatCompactCurrency(asset.ltcg.gain)}
            </div>
            {openTooltip === `ltcg-gain-${asset.coin}` && (
              <div className={tooltipClasses}>
                {formatCurrency(asset.ltcg.gain)}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
          <div className="relative group/tooltip mt-0.5" onMouseEnter={() => setOpenTooltip(`ltcg-bal-${asset.coin}`)} onMouseLeave={() => setOpenTooltip(null)}>
            <div className="text-xs text-slate-400 dark:text-slate-500">{asset.ltcg.balance.toFixed(3)} {asset.coin}</div>
            {openTooltip === `ltcg-bal-${asset.coin}` && (
              <div className={tooltipClasses}>
                {asset.ltcg.balance.toString()} {asset.coin}
                <div className={arrowClasses} />
              </div>
            )}
          </div>
        </div>
      </td>

      
      <td className="px-4 py-4 text-right min-w-[150px]">
        <div 
          className={`transition-all duration-300 transform ${
            isSelected 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          {isSelected && (
            <div className="flex flex-col items-end">
              <span className="font-semibold text-gray-900 dark:text-slate-100">
                {smartFormat(asset.totalHolding)} {asset.coin}
              </span>
              <span className="text-xs text-blue-600 dark:text-brand-blue font-medium">
                ≈ {formatCurrency(asset.totalHolding * asset.currentPrice)}
              </span>
            </div>
          )}
        </div>
        
        {!isSelected && (
          <span className="text-slate-300 dark:text-slate-600 absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-300 delay-100">
            -
          </span>
        )}
      </td>
    </tr>
  );
};

export default HoldingsTableRow;