import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from "../api";
import Button from "../components/button";
import DropDown from "../components/dropDown";
import InputLabeled from "../components/inputLabeled";
import useAuth from "../hooks/auth";
import { BtcCurrencyPrices } from '../types';
import './updatePrice.css';

type CodeTypes = 'BRL' | 'EUR' | 'CAD';

function UpdatePrice() {
  const [selectedCurrency, setSelectedCurrency] = useState<CodeTypes>('BRL');
  const [data, setData] = useState<BtcCurrencyPrices>();
  const [newValue, setNewValue] = useState(0);
  const {localToken} = useAuth()
  const navigation = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  function fetchData() {
    api.crypto.getBtcPrices(localToken)
      .then(setData)
      .catch(x => {
        alert(x.message);
        navigation('/login');
      });
  }

  function updatePrice() {
    api.crypto
      .updatePrice(localToken, { currency: selectedCurrency, value: newValue })
      .then((x: { message: string }) => alert(x.message))
      .then(() => { navigation('/') })
      .catch((x: { message: string }) => alert(x.message))
  }

  if (!data) return <h1>Loading</h1>;

  const currentCurrency = data.bpi[selectedCurrency].rate_float / data.bpi.USD.rate_float;

  return (
    <div className="update-price-container">
      <div className="update-price-header"></div>
      <div className="update-price-content">
        <DropDown
          label="Moeda"
          options={['BRL', 'EUR', 'CAD']}
          value={selectedCurrency}
          onChange={(x) => setSelectedCurrency(x as CodeTypes)}
        />
        <div className="current-value">
          <span className="Label">Valor Atual:</span>
          <span> R$ {currentCurrency.toFixed(2)}</span>
        </div>
        <InputLabeled
          id="new-price-value"
          label="Novo Valor"
          type="number"
          value={newValue.toString()}
          onChange={x => setNewValue(Number(x))}
        />
        <Button
          color="primary"
          text="Atualizar"
          onClick={updatePrice}
        />
      </div>
    </div>
  );
}

export default UpdatePrice;