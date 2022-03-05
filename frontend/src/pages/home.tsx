import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import PriceLabeled from "../components/priceLabeled";
import { Bpi, BtcCurrencyPrices } from '../types';
import useAuth from "../hooks/auth";

import "./home.css"
import api from "../api";

function Home() {
  const { localToken } = useAuth()
  const [data, setData] = useState<BtcCurrencyPrices>();
  const navigation = useNavigate();

  useEffect(() => { fetchData() }, [])

  function fetchData() {
    api.crypto.getBtcPrices(localToken)
      .then(setData)
      .catch(x => {
        alert(x.message);
        navigation('/login');
      });
  }

  if (!data) return <h1>Loading</h1>;

  const currencies = Object.keys(data.bpi).filter(x => x !== 'BTC');

  return (
    <div className="home-container">
      <Button
        text="Atualizar valor monetário"
        color="secondary"
        onClick={() => { navigation('/update-price') }}
      />

      <div className="currencies-prices">
        <div className="currencies-btc">
          <PriceLabeled code="BTC" price={data.bpi.BTC.rate} />
        </div>
        <div className="currencies-others">
          {currencies.map((code, i) => (
            <PriceLabeled key={code} code={code} price={data.bpi[code as keyof Bpi].rate} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home