import React, { useState } from 'react';
import {formatCompactCurrency, formatExact } from '../../utils/formatters';

interface GainsData {
  profits: number;
  losses: number;
  net: number;
}

interface PreHarvestingCardProps {
  stcg: GainsData;
  ltcg: GainsData;
  realized: number;
}

const PreHarvestingCard: React.FC<PreHarvestingCardProps> = ({ stcg, ltcg, realized }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  
  const tooltipClasses = "absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 p-3 text-xs text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap z-10 font-normal tracking-wide";
  const arrowClasses = "absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-slate-900";

  return (
    <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-4 shadow-lg transition-colors">
      <h2 className="text-2xl font-semibold mb-2 dark:text-white">Pre Harvesting</h2>

      <div className="space-y-2 text-lg font-medium">
        <div className="grid grid-cols-3 text-gray-600 dark:text-slate-400">
          <span></span>
          <span className="text-right">Short-term</span>
          <span className="text-right">Long-term</span>
        </div>

        <div className="grid grid-cols-3 items-center">
          <span className="text-gray-700 dark:text-slate-300">Profits</span>
          <span className="text-right text-gray-600 dark:text-slate-300">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-stcg-prof')} onMouseLeave={() => setOpenTooltip(null)}>
              {formatCompactCurrency(stcg.profits)}
              {openTooltip === 'pre-stcg-prof' && <div className={tooltipClasses}>${formatExact(stcg.profits)}<div className={arrowClasses} /></div>}
            </div>
          </span>
          <span className="text-right text-gray-600 dark:text-slate-300">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-ltcg-prof')} onMouseLeave={() => setOpenTooltip(null)}>
              {formatCompactCurrency(ltcg.profits)}
              {openTooltip === 'pre-ltcg-prof' && <div className={tooltipClasses}>${formatExact(ltcg.profits)}<div className={arrowClasses} /></div>}
            </div>
          </span>
        </div>

        <div className="grid grid-cols-3 items-center">
          <span className="text-gray-700 dark:text-slate-300">Losses</span>
          <span className="text-right text-gray-600 dark:text-slate-300">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-stcg-loss')} onMouseLeave={() => setOpenTooltip(null)}>
              -{formatCompactCurrency(stcg.losses)}
              {openTooltip === 'pre-stcg-loss' && <div className={tooltipClasses}>-${formatExact(stcg.losses)}<div className={arrowClasses} /></div>}
            </div>
          </span>
          <span className="text-right text-gray-600 dark:text-slate-300">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-ltcg-loss')} onMouseLeave={() => setOpenTooltip(null)}>
              -{formatCompactCurrency(ltcg.losses)}
              {openTooltip === 'pre-ltcg-loss' && <div className={tooltipClasses}>-${formatExact(ltcg.losses)}<div className={arrowClasses} /></div>}
            </div>
          </span>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-brand-border grid grid-cols-3 items-center font-semibold">
          <span className="text-gray-900 dark:text-white">Net Capital Gains</span>
          <span className="text-right dark:text-white">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-stcg-net')} onMouseLeave={() => setOpenTooltip(null)}>
              {stcg.net < 0 ? '-' : ''}{formatCompactCurrency(stcg.net)}
              {openTooltip === 'pre-stcg-net' && <div className={tooltipClasses}>{stcg.net < 0 ? '-' : ''}${formatExact(stcg.net)}<div className={arrowClasses} /></div>}
            </div>
          </span>
          <span className="text-right dark:text-white">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-ltcg-net')} onMouseLeave={() => setOpenTooltip(null)}>
              {ltcg.net < 0 ? '-' : ''}{formatCompactCurrency(ltcg.net)}
              {openTooltip === 'pre-ltcg-net' && <div className={tooltipClasses}>{ltcg.net < 0 ? '-' : ''}${formatExact(ltcg.net)}<div className={arrowClasses} /></div>}
            </div>
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200 dark:border-brand-border flex items-center gap-3">
        <span className="text-[22px] font-semibold text-gray-900 dark:text-white">
          Realised Capital Gains:
        </span>
        <span className="text-xl font-bold dark:text-white">
          <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('pre-realized')} onMouseLeave={() => setOpenTooltip(null)}>
            {realized < 0 ? '-' : ''}{formatCompactCurrency(realized)}
            {openTooltip === 'pre-realized' && <div className={tooltipClasses}>{realized < 0 ? '-' : ''}${formatExact(realized)}<div className={arrowClasses} /></div>}
          </div>
        </span>
      </div>
    </div>
  );
};

export default PreHarvestingCard;