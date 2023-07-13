import React from 'react';
import './error.css';
import Card from './card';
import { useState } from 'react';
import Button from './button';

export default function ErrorModal(props) {
  

  return (
    <div>
      <div  className='backdrop' onClick={props.onClick}></div>
    <Card className='modal'   >
    <header className='header'>
      <h2> {props.title} </h2>
    </header>
    <div className='content' >
      <p>{props.message} </p>
    </div>
    <footer className='actions'>
      <Button onClick={props.onClick} >Okay</Button>
    </footer>
    </Card>
    </div>
  )
}