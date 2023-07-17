/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
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
  const [coordinates, setCoordinates] = useState([]);
  const fileTypes = ['JPG', 'PNG'];

  return (
    <div className="layout">
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-plus-square" color="#464E47" fontSize="" />
        {' '}
        AGREGAR CAMPO
      </h1>

      <div className="tarjetas">
        <Card className="agregar-campo-container max-content">
          <div className="campo" id="mapa">
            <AgroMap coordinates={(coord) => setCoordinates(coord)} />
            { console.log(coordinates)}
          </div>
        </Card>
        <Card className="agregar-campo-container min-content">
          <form>
            <Input
              value={nombreCampo}
              placeholder="Inserte el nombre"
              onChange={(nombre) => setNombreCampo(nombre)}
              type="text"
              className="agregar-campo-input"
              accept=""
            />
            {/* <Input
              value={imagen}
              placeholder="Inserte una imagen"
              onChange={(imagen) => setImagen(imagen)}
              type="file"
              className="agregar-campo-input"
              accept="image/*"
            /> */}
            <FileUploader
              handleChange={(imagen) => setImagen(imagen)}
              name="foto-campo"
              types={fileTypes}
              required
              hoverTitle="Drop here"

            >
              <div className="upload-image-container">
                <Icon className="bi bi-cloud-arrow-up" color="gray" fontSize="6vh" />
                <span> Suba o arrastre una imagen de su campo aqui  </span>
                {' '}

              </div>
              {' '}

            </FileUploader>
          </form>
        </Card>
      </div>
      <div className="botones">
        <Button type="button" onClick={() => nav('/user/home')} className="green-button cancelar">Cancelar</Button>
        <Button type="button" onClick={() => console.log('')} className="green-button">Siguiente</Button>
      </div>
    </div>
  );
}
