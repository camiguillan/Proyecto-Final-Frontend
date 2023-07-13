import React from 'react'
import Header from '../reusable/header/header';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddIcon from '../../assets/icons/addIcon';
import "./agregarCampo.scss";
import Card from '../reusable/card/card';


export default function AgregarCampo() {
  return (
    <div>
      <Header></Header>
      <h2 className='agregar-campo-titulo'> <AddIcon></AddIcon> AGREGAR CAMPO</h2>
      <Card className={"agregar-campo-container input"}>
        <form>
          <input placeholder='Inserte el nombre del campo'   />
          <input placeholder='Inserte el ancho del campo'   />
          <input placeholder='Inserte el largo del campo'   />
          <input placeholder='Inserte una imagen del campo'   />
       

        </form>
     
        </Card>
    </div>
  )
}
