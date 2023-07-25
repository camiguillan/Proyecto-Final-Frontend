/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { CROP_TYPES_KEYS } from '../../constants/plots';
import cropCheckFullField from '../reusable/map/funcionesMapa';
import { post } from '../conexionBack/conexionBack';

export default function AgregarCampo() {
  const { userID } = useParams();
  const nav = useNavigate();

  const fileTypes = ['JPG', 'PNG'];
  const [campoInfo, setCampoInfo] = useState({
    nombreCampo: '',
    imagen: '',
    coordinates: [-58.702963, -34.671792],
    features: [], // feature = [polygon: {}, crop: tipo cultivo]
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
  const cultivosOpciones = Object.keys(CROP_TYPES_KEYS);
  const [selectedCrop, setSelectedCrop] = useState('NONE');
  // console.log(drawField);

  const handleChange = (cultivo, index) => {
    const tempList = [...cultivos];
    tempList[index] = cultivo;
    const list2 = [...campoInfo.features];
    // list2[index + 1].crop = cultivo;
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: list2,
    }));
    setCultivos(tempList);
    setSelectedCrop(cultivo);
    // console.log(cultivos);
  };

  const addInput = () => {
    if (selectedCrop !== 'NONE') {
      setCultivos((cult) => [...cult, '']);
      setSelectedCrop('NONE');
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
      {opcion}
      {' '}
    </option>
  ));
  function areNewFeatures() {
    const featIds = features.map((feat) => feat.id);
    const newFeatIds = newFeatures.map((feat) => feat.id);
    // console.log(featIds, newFeatIds);
    return features.length <= newFeatures.length;
  }
  // eslint-disable-next-line no-unused-vars
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
            crop: cultivos[index - 1] ? cultivos[index - 1] : 'NONE',
          };
          // console.log('ADDING ', cultivos[index - 1], ' to ', feat.id);
          lista2.push(feat2);
        }
      });
      // console.log('TEMP LIST', tempList);
      // console.log('features', newFeatures);
      setCampoInfo((prevInfo) => ({
        ...prevInfo,
        features: lista2,
      }));
      setFeatures(tempList);
      // console.log(mainField);
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
      //  else addInput();
      // console.log('CAMPO INFO. FEATURES', campoInfo.features, lista2);
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
      {/* <Input
        value={cultivo}
        placeholder="Ingrese el cultivo"
        onChange={(cult) => handleChange(cult, index)}
        type="text"
        className="agregar-campo-input"
        accept=""
      /> */}
      {cultivos.length - 1 === index
        ? <Button type="button" onClick={addInput} className="green-button">+</Button>
        : <Button type="button" onClick={() => removeInput(index)} className="green-button">-</Button>}
    </label>
  ));
  // console.log(cultivos);
  // console.log('CAMPO INFO', campoInfo);
  // console.log('LISTA FEATURES', features);
  // console.log('MAIN FIELD', mainField);

  useEffect(() => {
    if (((mainField || mainField.id !== '') && newFeatures.length !== 0) && areNewFeatures()) { addFeature(); }
  }, [newFeatures]);

  useEffect(() => {
    if (campoInfo.features.length !== 0) {
      removeFeature();
    }
  }, [erased]);

  function guardarCampoInfo() {
    // console.log(campoInfo);
    const {
      plots, height, width, coordinates,
    } = cropCheckFullField(campoInfo.features);
    const finalInfo = {
      name: campoInfo.nombreCampo,
      coordinates,
      plots,
      height,
      width,
      image: campoInfo.imagen, // deberiamos pasarla a string
    };
    // post('/field', finalInfo);
    console.log(finalInfo);
    // nav(`/home/${userID}`);
  }

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
              addFeatures={setNewFeatures}
              removeFeature={(feats, removedFeature) => removeFeatureSt(feats, removedFeature)}
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
                    required
                    type="text"
                    className="agregar-campo-input"
                    accept=""
                  />

                </label>
                {drawField ? <p>Dibuje el campo principal</p> : cultivosInputs}

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
            <Button type="button" onClick={() => nav(`/home/${userID}`)} className="green-button cancelar">Cancelar</Button>
            <button id="grid" type="button">Add grid</button>
            <Button type="button" onClick={() => guardarCampoInfo()} className="green-button">Guardar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
