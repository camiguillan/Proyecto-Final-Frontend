import React from 'react';
import './card.scss';

export default function Card(props) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
