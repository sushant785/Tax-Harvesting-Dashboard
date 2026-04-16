import React, { useState } from 'react';

const Header: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipClasses = "absolute top-full left-0 mt-3 p-4 text-sm text-white bg-slate-900 rounded-xl shadow-2xl w-72 z-50 leading-relaxed whitespace-normal";
  const arrowClasses = "absolute -top-2 left-6 border-8 border-transparent border-b-slate-900";

  return (
    <div className="flex items-center gap-3 py-3 mt-3">
      <h1 className="text-3xl font-semibold text-gray-900 leading-none dark:text-slate-100">
        Tax Harvesting
      </h1>

      <div 
        className="relative inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <a href="#" className="text-base font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4 mt-1" onClick={(e) => e.preventDefault()}>
          How it works?
        </a>

        {showTooltip && (
          <div className={tooltipClasses}>
            <div className={arrowClasses} />
            <p className="font-semibold mb-1 text-blue-400">Tax-Loss Harvesting</p>
            <p className="text-slate-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              By selling assets at a loss, you can offset your capital gains 
              taxes and lower your overall tax liability for the year.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Header;