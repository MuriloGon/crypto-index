import React, { useState } from "react";

import './inputLabeled.css'

type props = {
  type: string
  id: string
  value: string
  label: string
  onChange: (newValue: string) => void
}

function InputLabeled({ type, id, label, value, onChange }: props) {
  return (
    <div className="input-label">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </div>
  );
}

export default InputLabeled