export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2
  }).format(value);
};


export const formatCompactCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value);
};

export const formatExact = (value: number) => {
  return Math.abs(value).toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 6 
  });
};

export const smartFormat = (val: number): string => {
  if (val === 0) return '0';
  if (Math.abs(val) < 0.0001) return val.toPrecision(4);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(val);
};