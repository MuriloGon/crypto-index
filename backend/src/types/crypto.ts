
export type Currency = {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
}

type Time = {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export type LocalCurrencies = {
  BRL: string;
  EUR: string;
  CAD: string;
}

export type CurrentPriceResponse = {
  time: Time;
  disclaimer: string;
} & {[key: string]: {[key: string]: Currency};}

