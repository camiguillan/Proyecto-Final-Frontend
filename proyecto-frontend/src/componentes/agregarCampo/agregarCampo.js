import React from 'react'
import Header from '../reusable/header/header';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddIcon from '../../assets/icons/addIcon';
import "./agregarCampo.scss";
import Card from '../reusable/card/card';
import Input from '../reusable/input_box/input';
import { useState } from 'react';
import Boton from '../reusable/boton/boton'; 
import { useNavigate } from 'react-router-dom'; 


export default function AgregarCampo() {
  const  [nombreCampo, setNombreCampo] = useState("");
  const [ancho, setAncho] =  useState("");
  const [largo, setLargo] = useState("");
  const [imagen, setImagen] = useState("");
  const nav = useNavigate();


  return (
    <div className='layout'>
      <Header></Header>
      <h1 className='agregar-campo-titulo'> <AddIcon></AddIcon> AGREGAR CAMPO</h1>
      <div className='tarjetas'>
      <Card className={"agregar-campo-container input"}>
        <form>
          <Input value={nombreCampo}   
                 placeholder='Inserte el nombre del campo'
                 onChange={(nombre) => setNombreCampo(nombre)} 
                 type="text" />
          <Input value={ancho}   
                 placeholder='Inserte el ancho del campo'
                 onChange={(ancho) => setAncho(ancho)}
                 type="text"/>
          <Input value={largo}  
                 placeholder='Inserte el largo del campo'
                 onChange={(largo) => setLargo(largo)}
                 type="text"/>
          <Input value={imagen}  
                 placeholder='Inserte una imagen del campo'
                 onChange={(imagen) => setImagen(imagen)} 
                 type="text"/>
        </form>
      </Card>
      <Card className={"agregar-campo-container input"} >
        <Input placeholder= {" Buscar direccion del campo"} />
        <div className='foto'>
          FOTO
        </div>
      </Card>
      </div>
      <div className='botones'>
      <Boton onClick={() => nav("/user/home") } text={"Cancelar"} className={"cancelar"}  ></Boton>
      <Boton onClick={() => console.log("")  } text={"Siguiente"}   ></Boton>
      </div>
    </div>
  )
}
