import React from "react";

import './priceLabeled.css'

type props = { code: string, price: string }

function PriceLabeled({ code, price }: props) {
  return (
    <div className="price-labeled">
      <h3>{code}</h3>
      <p>{price}</p>
    </div>
  )
}

export default PriceLabeled