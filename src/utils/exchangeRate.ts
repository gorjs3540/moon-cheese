const PRICE_PREFIX = {
  KRW: '₩',
  USD: '$',
};

export const convertPrice = (price: number, currency: CurrencyType, exchangeRate?: Record<CurrencyType, number>) => {
  if (!exchangeRate) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const convertedPrice = price * (exchangeRate[currency] || 1);
  return `${PRICE_PREFIX[currency]} ${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
