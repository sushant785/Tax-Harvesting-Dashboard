import React from 'react';

export const SummaryCardsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 animate-pulse">

      <div className="bg-white dark:bg-brand-card border border-gray-100 dark:border-brand-border rounded-xl p-4 shadow-sm transition-colors">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-brand-border flex gap-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-brand-card border border-slate-200 dark:border-brand-border rounded-xl p-4 shadow-sm">
        <div className="h-8 bg-slate-300 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-800 rounded w-full"></div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-brand-border flex gap-4">
          <div className="h-8 bg-slate-300 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-8 bg-slate-300 dark:bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export const HoldingsTableSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse mt-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
      </div>

      <div className="rounded-xl border border-gray-100 dark:border-brand-border bg-white dark:bg-brand-card shadow-sm overflow-hidden transition-colors">
        <div className="h-12 bg-slate-50 dark:bg-brand-bg/50 border-b border-slate-100 dark:border-brand-border"></div>
        
        <div className="divide-y divide-slate-50 dark:divide-brand-border">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 h-20">
              <div className="flex items-center gap-4 w-1/4">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded shrink-0"></div>
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-12"></div>
                </div>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};