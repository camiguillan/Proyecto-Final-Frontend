/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './agregarCampo.scss';
import Card from '../reusable/card/card';
import Input from '../reusable/input_box/input';
import Icon from '../../assets/icons/icon';
import Button from '../reusable/boton/button';
// eslint-disable-next-line no-unused-vars
import AgroMap from '../reusable/map/agroMap';

export default function AgregarCampo() {
  const [nombreCampo, setNombreCampo] = useState('');
  const [imagen, setImagen] = useState('');
  const nav = useNavigate();

  return (
    <div className="layout">
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-plus-square" color="#464E47" />
        {' '}
        AGREGAR CAMPO
      </h1>

      <div className="tarjetas">
        <Card className="agregar-campo-container input max-content">
          <Input placeholder=" Buscar direccion del campo" />
          <div className="foto" id="mapa">
            <AgroMap />
          </div>
        </Card>
        <Card className="agregar-campo-container input min-content">
          <form>
            <Input
              value={nombreCampo}
              placeholder="Inserte el nombre del campo"
              onChange={(nombre) => setNombreCampo(nombre)}
              type="text"
            />
            <Input
              value={imagen}
              placeholder="Inserte una imagen del campo"
              onChange={(imagen) => setImagen(imagen)}
              type="text"
            />
          </form>
        </Card>
      </div>
      <div className="botones">
        <Button onClick={() => nav('/user/home')} className="green-button cancelar">Cancelar</Button>
        <Button onClick={() => console.log('')} className="green-button">Siguiente</Button>
      </div>
    </div>
  );
}
