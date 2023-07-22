/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './agregarLotes.scss';
import Card from '../reusable/card/card';
import Input from '../reusable/input_box/input';
import Icon from '../../assets/icons/icon';
import Button from '../reusable/boton/button';
// eslint-disable-next-line no-unused-vars
import AgroMap from '../reusable/map/agroMap';

export default function AgregarLotes() {
  const [nombreCampo, setNombreCampo] = useState('');
  const nav = useNavigate();
  const [coordinates, setCoordinates] = useState([]);
  const [cantCultivos, setCantCultivos] = useState('');

  return (
    <div className="layout">
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-plus-square" color="#464E47" fontSize="" />
        {' '}
        AGREGAR LOTES
      </h1>

      <div className="tarjetas">
        <Card className="agregar-campo-container max-content">
          <div className="campo" id="mapa">
            <AgroMap coordinates={(coord) => setCoordinates(coord)} />
            { console.log(coordinates)}
          </div>
        </Card>
        <div className="derecha">
          <Card className="agregar-campo-container min-content">
            <form>
              <div className="agregar-campo-inputs">
                <label className="agregar-campo-label">
                  Nombre del Campo:
                  <Input
                    value={nombreCampo}
                    placeholder="Ingrese el nombre"
                    onChange={(nombre) => setNombreCampo(nombre)}
                    type="text"
                    className="agregar-campo-input"
                    accept=""
                  />
                </label>

                <label className="agregar-campo-label">
                  Tipos de cultivos:
                  <Input
                    value={cantCultivos}
                    placeholder="Ingrese cantidad de tipos"
                    onChange={(cant) => setCantCultivos(cant)}
                    type="number"
                    className="agregar-campo-input"
                    accept=""
                  />
                </label>
              </div>
            </form>
          </Card>

          <div className="botones">
            <Button type="button" onClick={() => nav('/user/home')} className="green-button cancelar">Cancelar</Button>
            <Button type="button" onClick={() => console.log('')} className="green-button">Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
