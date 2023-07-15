import React from 'react';
import "./input_box.scss";

export default function Input(props) {
  return (
    <input  className='sub-rectangle' 
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.target.value)}
            type={props.type}    />
  )
}
