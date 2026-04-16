import React, { useEffect } from 'react';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import DisclaimerAccordion from './ui/DisclaimerAccordion';
import SummaryCardsContainer from './widgets/SummaryCardsContainer';
import HoldingsTable from './widgets/HoldingsTable';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchPortfolioData } from '../store/portfolioSlice';

const TaxHarvestingDashboard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPortfolioData());
    }
  }, [status, dispatch]);

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500 font-bold">
        Failed to load portfolio data. Please refresh.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-brand-bg font-sans text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Navbar/>
      <main className="w-full flex flex-col gap-3.5 px-10 sm:px-15 lg:px-20 pb-10">
        <Header />
        <div>
            <DisclaimerAccordion />
        </div>
        <div>
            <SummaryCardsContainer />
        </div>  
        <div className="bg-white dark:bg-brand-card rounded-xl shadow-sm border dark:border-brand-border border-gray-200 overflow-hidden p-6 md:p-8">
          <HoldingsTable />
        </div>
      </main>
    </div>
  );
};

export default TaxHarvestingDashboard;