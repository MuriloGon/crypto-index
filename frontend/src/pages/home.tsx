import React from "react";
import Button from "../components/button";
import PriceLabeled from "../components/priceLabeled";

import "./home.css"

function Home() {
  const currencies = ['A', 'B', 'C', 'D'];

  return (
    <div className="home-container">
      <Button
        text="Atualizar valor monetário"
        color="secondary"
        onClick={() => { }}
      />

      <div className="currencies-prices">
        <div className="currencies-btc">
          <PriceLabeled code="BRC" price="x,xxx" />
        </div>
        <div className="currencies-others">
          {currencies.map((x, i) => (
            <PriceLabeled code="BRC" price="123,123123" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home