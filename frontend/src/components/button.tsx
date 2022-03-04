import React from "react";
import './button.css'

type props = {text: string, onClick: () => any, color: 'primary'|'secondary'}

function Button({text, onClick, color}: props) {
  return (
    <button className={`custom-button ${color}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button