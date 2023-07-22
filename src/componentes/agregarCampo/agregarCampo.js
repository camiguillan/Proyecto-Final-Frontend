/* eslint-disable jsx-a11y/label-has-associated-control */
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
  const nav = useNavigate();
  // const [nombreCampo, setNombreCampo] = useState('');
  // const [imagen, setImagen] = useState('');
  // const [coordinates, setCoordinates] = useState([]);
  // const [cantCultivos, setCantCultivos] = useState('');
  const fileTypes = ['JPG', 'PNG'];
  const [campoInfo, setCampoInfo] = useState({
    nombreCampo: '',
    imagen: '',
    coordinates: [-58.702963, -34.671792],
    cantCultivos: '',
  });

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
            <AgroMap
              coordinates={campoInfo.coordinates}
              changeCoordinates={(coord) => setCampoInfo((prevInfo) => ({
                ...prevInfo,
                coordinates: coord,
              }))}
            />
          </div>
        </Card>
        <div className="derecha">
          <Card className="agregar-campo-container min-content">
            <form>
              <div className="agregar-campo-inputs">
                <label className="agregar-campo-label">
                  Nombre del Campo:
                  <Input
                    value={campoInfo.nombreCampo}
                    placeholder="Ingrese el nombre"
                    onChange={(nombre) => setCampoInfo((prevInfo) => ({
                      ...prevInfo,
                      nombreCampo: nombre,
                    }))}
                    type="text"
                    className="agregar-campo-input"
                    accept=""
                  />
                </label>

                <label className="agregar-campo-label">
                  Tipos de cultivos:
                  <Input
                    value={campoInfo.cantCultivos}
                    placeholder="Ingrese cantidad de tipos"
                    onChange={(cant) => setCampoInfo((prevInfo) => ({
                      ...prevInfo,
                      cantCultivos: cant,
                    }))}
                    type="number"
                    className="agregar-campo-input"
                    accept=""
                  />
                </label>
              </div>
              <FileUploader
                handleChange={(img) => setCampoInfo((prevInfo) => ({
                  ...prevInfo,
                  imagen: img,
                }))}
                name="foto-campo"
                types={fileTypes}
                required
                label="Suba o arrastre una imagen de su campo aqui"
                classes="drop_area"
                hoverTitle=" "
              >
                {campoInfo.imagen ? (
                  <div>
                    <div className="imagen-campo">
                      <img src={URL.createObjectURL(campoInfo.imagen)} alt="user-campo" />

                      {' '}
                    </div>
                    <Button
                      className="button"
                      onClick={() => setCampoInfo((prevInfo) => ({ ...prevInfo, imagen: '' }))}
                    >
                      Delete

                    </Button>
                  </div>
                )
                  : (
                    <div className="upload-image-container">
                      <Icon className="bi bi-cloud-arrow-up" color="gray" fontSize="6vh" />
                      <span> Suba o arrastre una imagen de su campo aqui </span>
                      {' '}
                    </div>
                  )}
              </FileUploader>
            </form>
          </Card>

          <div className="botones">
            <Button type="button" onClick={() => nav('/user/home')} className="green-button cancelar">Cancelar</Button>
            <Button type="button" onClick={() => nav('/agregarLotes/1', { state: campoInfo })} className="green-button">Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
