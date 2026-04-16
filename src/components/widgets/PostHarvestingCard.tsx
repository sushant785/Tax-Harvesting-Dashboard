import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { formatCompactCurrency, formatExact } from '../../utils/formatters';

interface GainsData {
  profits: number;
  losses: number;
  net: number;
}

interface PostHarvestingCardProps {
  stcg: GainsData;
  ltcg: GainsData;
  realized: number;
  savings: number;
}

const PostHarvestingCard: React.FC<PostHarvestingCardProps> = ({ stcg, ltcg, realized, savings }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const tooltipClasses = "absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 p-3 text-xs text-white bg-slate-900 rounded-lg shadow-xl whitespace-nowrap z-10 font-normal tracking-wide";
  const arrowClasses = "absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-slate-900";

  return (
    <div className="bg-[#2788ff] text-white rounded-xl p-4 shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-2">After Harvesting</h2>

        <div className="space-y-2 text-lg font-medium">
          <div className="grid grid-cols-3 text-blue-100">
            <span></span>
            <span className="text-right">Short-term</span>
            <span className="text-right">Long-term</span>
          </div>

          <div className="grid grid-cols-3 items-center text-white">
            <span>Profits</span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-stcg-prof')} onMouseLeave={() => setOpenTooltip(null)}>
                {formatCompactCurrency(stcg.profits)}
                {openTooltip === 'post-stcg-prof' && <div className={tooltipClasses}>${formatExact(stcg.profits)}<div className={arrowClasses} /></div>}
              </div>
            </span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-ltcg-prof')} onMouseLeave={() => setOpenTooltip(null)}>
                {formatCompactCurrency(ltcg.profits)}
                {openTooltip === 'post-ltcg-prof' && <div className={tooltipClasses}>${formatExact(ltcg.profits)}<div className={arrowClasses} /></div>}
              </div>
            </span>
          </div>

          <div className="grid grid-cols-3 items-center text-white">
            <span>Losses</span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-stcg-loss')} onMouseLeave={() => setOpenTooltip(null)}>
                -{formatCompactCurrency(stcg.losses)}
                {openTooltip === 'post-stcg-loss' && <div className={tooltipClasses}>-${formatExact(stcg.losses)}<div className={arrowClasses} /></div>}
              </div>
            </span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-ltcg-loss')} onMouseLeave={() => setOpenTooltip(null)}>
                -{formatCompactCurrency(ltcg.losses)}
                {openTooltip === 'post-ltcg-loss' && <div className={tooltipClasses}>-${formatExact(ltcg.losses)}<div className={arrowClasses} /></div>}
              </div>
            </span>
          </div>

          <div className="pt-3 grid grid-cols-3 items-center font-semibold text-white">
            <span>Net Capital Gains</span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-stcg-net')} onMouseLeave={() => setOpenTooltip(null)}>
                {formatCompactCurrency(stcg.net)}
                {openTooltip === 'post-stcg-net' && <div className={tooltipClasses}>{stcg.net < 0 ? '-' : ''}${formatExact(stcg.net)}<div className={arrowClasses} /></div>}
              </div>
            </span>
            <span className="text-right">
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-ltcg-net')} onMouseLeave={() => setOpenTooltip(null)}>
                {ltcg.net < 0 ? '-' : ''}{formatCompactCurrency(ltcg.net)}
                {openTooltip === 'post-ltcg-net' && <div className={tooltipClasses}>{ltcg.net < 0 ? '-' : ''}${formatExact(ltcg.net)}<div className={arrowClasses} /></div>}
              </div>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-5 pt-4 border-t border-blue-500/50 flex items-center gap-3">
          <span className="text-2xl font-semibold">
            Effective Capital Gains:
          </span>
          <span className="text-2xl font-bold">
            <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('post-realized')} onMouseLeave={() => setOpenTooltip(null)}>
              {formatCompactCurrency(realized)}
              {openTooltip === 'post-realized' && <div className={tooltipClasses}>{realized < 0 ? '-' : ''}${formatExact(realized)}<div className={arrowClasses} /></div>}
            </div>
          </span>
        </div>

        {savings > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full w-fit">
            <Sparkles className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>
              You save upto{' '}
              <div className="relative group/tooltip inline-block" onMouseEnter={() => setOpenTooltip('savings')} onMouseLeave={() => setOpenTooltip(null)}>
                <span className="text-yellow-400">{formatCompactCurrency(savings)}</span>
                {openTooltip === 'savings' && <div className={tooltipClasses}>${formatExact(savings)}<div className={arrowClasses} /></div>}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHarvestingCard;