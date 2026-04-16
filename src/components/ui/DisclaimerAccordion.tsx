import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const DisclaimerAccordion: React.FC = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#0052fe] rounded-lg bg-[#eaf2ff] dark:border-brand-disclaimer-border dark:bg-brand-disclaimer overflow-hidden shadow-sm transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-[#eaf2ff] hover:bg-blue-50/50 dark:hover:bg-white/5 dark:bg-brand-disclaimer transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 text-gray-900 dark:text-slate-200 font-semibold text-lg">
          <Info className="h-7 w-7 text-blue-600 dark:text-slate-200" />
          <span>Important Notes & Disclaimers</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-blue-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-blue-400" />
        )}
      </button>

      
      {isOpen && (
        <div className="px-5 pb-5 text-gray-800 dark:text-slate-300 leading-relaxed font-medium">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DisclaimerAccordion;