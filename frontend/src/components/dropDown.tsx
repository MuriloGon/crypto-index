import React from "react";
import './dropDown.css'

type props = {
  options: Array<string>
  value: string
  label: string
  onChange: (newValue: string) => void
}

function DropDown({ options, label, value, onChange }: props) {
  return (
    <div className="custom-select">
      <label>{label}</label>
      <select value={value} onChange={(x) => onChange(x.target.value)}>
        {options.map((op, index) => (
          <option key={op + index} value={op}>{op}</option>
        ))}
      </select>
    </div>
  )
}

export default DropDown