/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import Header from '../reusable/header/header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './agregarCampo.scss';
import Card from '../reusable/card/card';
import Input from '../reusable/input_box/input';
import Icon from '../../assets/icons/icon';
import Button from '../reusable/boton/button';
import AgroMap from '../reusable/map/agroMap';
import { CROP_TYPES_KEYS } from '../../constants/plots';
import cropCheckFullField from '../reusable/map/funcionesMapa';
import { post } from '../conexionBack/conexionBack';
import { CROP_TYPES_TRANSLATIONS } from '../../constants/translations';
import MapContainer from '../reusable/mapContainer/mapContainer';

export default function AgregarCampo() {
  const { userID } = useParams();
  const nav = useNavigate();

  const fileTypes = ['JPG', 'PNG'];
  const [campoInfo, setCampoInfo] = useState({
    nombreCampo: '',
    imagen: '',
    coordinates: [-58.44657291015618, -34.595435305682834],
    features: [],
  });

  const [cultivos, setCultivos] = useState(['']);
  const [features, setFeatures] = useState([]);
  const [newFeatures, setNewFeatures] = useState([]);
  const [erased, setNewErased] = useState([]);
  const [mainField, setMainField] = useState({
    geometry: [],
    id: '',
    properties: {},
    type: '',
  });

  const [drawField, setdrawField] = useState(true);
  const cultivosOpciones = Object.values(CROP_TYPES_KEYS);
  const [selectedCrop, setSelectedCrop] = useState(CROP_TYPES_KEYS.NONE);
  const [invalid, setinValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });

  const handleChange = (cultivo, index) => {
    const tempList = [...cultivos];
    tempList[index] = cultivo;
    const list2 = [...campoInfo.features];
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: list2,
    }));
    setCultivos(tempList);
    setSelectedCrop(cultivo);
  };

  const addInput = () => {
    if (selectedCrop !== CROP_TYPES_KEYS.NONE) {
      setCultivos((cult) => [...cult, '']);
      setSelectedCrop(CROP_TYPES_KEYS.NONE);
    }
  };

  const removeInput = (deletedCrop) => {
    const tempList = [...cultivos];
    tempList.splice(cultivos.indexOf(deletedCrop), 1);
    setCultivos(tempList);
  };

  const opciones = cultivosOpciones.map((opcion) => (
    <option key={opcion} value={opcion}>
      {' '}
      {CROP_TYPES_TRANSLATIONS[opcion]}
      {' '}
    </option>
  ));
  function areNewFeatures() {
    const featIds = features.map((feat) => feat.id);
    const newFeatIds = newFeatures.map((feat) => feat.id);
    return features.length <= newFeatures.length;
  }
  const addFeature = () => {
    if (areNewFeatures()) {
      const tempList = [...features];
      const lista2 = [...campoInfo.features];
      newFeatures.forEach((feat, index) => {
        const hasFeature = features.map((fea) => fea.id).includes(feat.id);
        if (hasFeature) {
          tempList[index] = feat;
          lista2[index].polygon = feat;
        } else {
          tempList.push(feat);
          const feat2 = {
            polygon: feat,
            crop: cultivos[index - 1] ? cultivos[index - 1] : CROP_TYPES_KEYS.NONE,
          };
          lista2.push(feat2);
        }
      });
      setCampoInfo((prevInfo) => ({
        ...prevInfo,
        features: lista2,
      }));
      setFeatures(tempList);
      if (mainField.id === '' || !mainField) {
        const {
          geometry, id, properties, type,
        } = tempList[0];
        setMainField(
          {
            geometry,
            id,
            properties,
            type,
          },
        );
        setdrawField(false);
      }
    }
  };

  const removeFeatureSt = (feats, removedFeature) => {
    setNewFeatures(feats);
    setNewErased(removedFeature[0]);
  };

  const removeFeature = () => {
    const erasedId = erased.id;
    const erasedCrop = campoInfo.features.filter(({ polygon }) => polygon.id === erasedId)[0].crop;
    removeInput(erasedCrop);
    setFeatures(newFeatures);
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: campoInfo.features.filter(({ polygon }) => polygon.id !== erasedId),
    }));
  };

  const cultivosInputs = cultivos.map((cultivo, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <label key={index} className="agregar-campo-label">
      Tipo de cultivo:
      <select className="select" value={cultivo} onChange={(e) => handleChange(e.target.value, index)}>
        {' '}
        {opciones}
        {' '}
      </select>

      {/* {cultivos.length - 1 === index
        ? <Button type="button" onClick={addInput} className="green-button">+</Button>
        :
        <Button type="button" onClick={() => removeInput(index)} className="green-button">-</Button>}
        */}
      <Button type="button" onClick={() => removeInput(index)} className="green-button">-</Button>
    </label>
  ));

  useEffect(() => {
    if (((mainField || mainField.id !== '') && newFeatures.length !== 0) && areNewFeatures()) { addFeature(); }
  }, [newFeatures]);

  useEffect(() => {
    if (campoInfo.features.length !== 0) {
      removeFeature();
    }
  }, [erased]);

  function validateForm() {
    console.log(campoInfo);
    if (campoInfo.nombreCampo === '') {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor complete el nombre de su campo',
      });
      setinValid(true);
      return false;
    }
    if (cultivos.filter((cultivo) => cultivo === CROP_TYPES_KEYS.NONE).length > 1
    || campoInfo.features.length === 0) {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor complete el dibujo de su campo o el tipo de cultivo que posee su lote',
      });
      setinValid(true);
      console.log('Falta subir imagen');
      return false;
    }
    if (campoInfo.imagen === '') {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor suba una foto de su campo',
      });
      setinValid(true);
      console.log('Falta subir imagen');
      return false;
    }
    // Si sacamos main field, cambiar a cultivos.includes(CROP_TYPES_KEYS.NONE) TODO

    return true;
  }

  function guardarCampoInfo() {
    const valid = validateForm();
    if (!valid) {
      return;
    }
    const {
      plots, height, width, coordinates,
    } = cropCheckFullField(campoInfo.features);
    const formData = new FormData();
    formData.append('name', campoInfo.nombreCampo);
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append('plots', JSON.stringify(plots));
    formData.append('height', height);
    formData.append('width', width);
    formData.append('image', campoInfo.imagen); // Assuming campoInfo.image is a File object

    const accessToken = `Bearer ${userID}`;
    post('field', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
    nav(`/home/${userID}`);
  }

  const okay = () => {
    setinValid(false);
    setErrorMessage({ title: '', message: '' });
  };

  return (
    <div>
      <Header />
      <h1 className="agregar-campo-titulo">
        {' '}
        <Icon className="bi bi-plus-square" color="#464E47" fontSize="" />
        {' '}
        AGREGAR CAMPO
      </h1>
      <MapContainer
        campInfo={{
          nombreCampo: '',
          imagen: '',
          coordinates: [-58.44657291015618, -34.595435305682834],
          features: [],
        }}
        cultivosSeleccionados={['']}
        feats={[]}
        campoPrincipal={{
          geometry: [],
          id: '',
          properties: {},
          type: '',
        }}
        edit={false}
      />

    </div>
  );
}
