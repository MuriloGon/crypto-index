
export interface Time {
    updated: string;
    updatedISO: Date;
    updateduk: string;
}
export interface Currency {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
}


export interface Bpi {
    USD: Currency;
    BRL: Currency;
    EUR: Currency;
    CAD: Currency;
    BTC: Currency;
}

export interface BtcCurrencyPrices {
    time: Time;
    disclaimer: string;
    bpi: Bpi;
}


