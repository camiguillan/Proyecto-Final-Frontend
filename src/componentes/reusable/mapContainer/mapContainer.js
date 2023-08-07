/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './mapContainer.scss';
import Card from '../card/card';
import Input from '../input_box/input';
import Icon from '../../../assets/icons/icon';
import AgroMap from '../map/agroMap';
import Button from '../boton/button';
import { CROP_TYPES_KEYS } from '../../../constants/plots';
import cropCheckFullField from '../map/funcionesMapa';
import { patch, post } from '../../conexionBack/conexionBack';
import { CROP_TYPES_TRANSLATIONS } from '../../../constants/translations';
import ErrorModal from '../errorFolder/errores';

export default function MapContainer({
  campInfo, cultivosSeleccionados, feats, campoPrincipal, edit,
}) {
  const { userID } = useParams();
  const { fieldID } = useParams();
  const nav = useNavigate();
  console.log(campInfo);

  const fileTypes = ['JPG', 'PNG'];
  const [campoInfo, setCampoInfo] = useState(campInfo);

  const [cultivos, setCultivos] = useState([...cultivosSeleccionados]);
  const [features, setFeatures] = useState(feats);
  const [newFeatures, setNewFeatures] = useState([]);
  const [erased, setNewErased] = useState([]);
  const [featErasedId, setNewErasedId] = useState('');
  // const [mainField, setMainField] = useState({
  //   geometry: campoPrincipal.geometry,
  //   id: campoPrincipal.id,
  //   properties: campoPrincipal.properties,
  //   type: campoPrincipal.type,
  // });

  const [drawField, setdrawField] = useState(!edit);
  const cultivosOpciones = Object.values(CROP_TYPES_KEYS);
  const [selectedCrop, setSelectedCrop] = useState(CROP_TYPES_KEYS.NONE);
  const [invalid, setinValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });
  console.log(cultivos, cultivosSeleccionados);
  console.log(campoInfo.features);

  const handleChange = (cultivo, index) => {
    const tempList = [...cultivos];
    tempList[index] = cultivo;
    const list2 = [...campoInfo.features];
    console.log(list2, 'CROP VACIO');
    if (features.length === 0) {
      // list2 = [{
      //   polygon: {
      //     id: '',
      //     type: '',
      //     properties: {},
      //     geometry: {
      //       coordinates: [],
      //       type: '',
      //     },
      //   },
      //   crop: cultivo,
      // }];
      // console.log(list2, index, 'hola?');
    }
    console.log('INDEX: ', index);
    if (list2.length >= index + 1) {
      list2[index].crop = cultivo;
      console.log('list length == index + 1', list2, index);
    }
    if (list2.length === tempList.length) {
      console.log('deaaaaa', list2, tempList);
    }
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: list2,
    }));
    setCultivos(tempList);
    setSelectedCrop(cultivo);
  };

  const addInput = () => {
    if (selectedCrop === CROP_TYPES_KEYS.NONE) {
      setErrorMessage({
        title: 'No se puede agregar cultivo',
        message: 'Por favor seleccione un cultivo',
      });
      setinValid(true);
      return;
    }
    console.log('CULTIVOS: ', cultivos);
    console.log('FEATURES: ', campoInfo.features);
    if (cultivos.length > campoInfo.features.length || campoInfo.features.some(({ polygon }) => polygon.id === '')) {
      setErrorMessage({
        title: 'No se puede agregar cultivo',
        message: `Por favor dibuje el campo para ${CROP_TYPES_TRANSLATIONS[cultivos[cultivos.length - 1]]}`,
      });
      setinValid(true);
    } else {
      setCultivos((cult) => [...cult, '']);
      setSelectedCrop(CROP_TYPES_KEYS.NONE);
    }
  };

  const removeInput = (deletedCrop) => {
    console.log(deletedCrop);
    const tempList = [...cultivos];
    const tempListFeatures = [...campoInfo.features];
    const cropIndex = tempListFeatures.findIndex((f) => f.crop === deletedCrop);
    const erasedCrop = tempListFeatures[cropIndex];
    tempList.splice(cropIndex, 1);
    tempListFeatures.splice(cropIndex, 1);
    if (tempList.length > 0) {
      setCultivos(tempList);
    } else {
      setCultivos(['']);
    }
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: tempListFeatures,
    }));
    console.log(erasedCrop);
    setNewErasedId(erasedCrop.polygon.id);
  };

  const opciones = cultivosOpciones.map((opcion) => (
    <option key={opcion} value={opcion}>
      {' '}
      {CROP_TYPES_TRANSLATIONS[opcion]}
      {' '}
    </option>
  ));
  function areNewFeatures() {
    return features.length <= newFeatures.length;
  }

  const addFeature = () => {
    if (areNewFeatures()) {
      const tempList = [...features];
      const lista2 = [...campoInfo.features];
      console.log('NUEVAS FEATURES ADD F', newFeatures);
      newFeatures.forEach((feat, index) => {
        const hasFeature = features.map((fea) => fea.id).includes(feat.id);
        if (hasFeature) {
          tempList[index] = feat;
          lista2[index].polygon = feat;
        } else {
          tempList.push(feat);
          const feat2 = {
            polygon: feat,
            crop: cultivos[index] ? cultivos[index] : CROP_TYPES_KEYS.NONE,
          };
          lista2.push(feat2);
        }
      });
      setCampoInfo((prevInfo) => ({
        ...prevInfo,
        features: lista2,
      }));
      setFeatures(tempList);
      // if (mainField.id === '' || !mainField) {
      //   const {
      //     geometry, id, properties, type,
      //   } = tempList[0];
      //   setMainField(
      //     {
      //       geometry,
      //       id,
      //       properties,
      //       type,
      //     },
      //   );
      //   setdrawField(false);
      // }
    }
  };

  const removeFeatureSt = (fts, removedFeature) => {
    console.log('FEATURES TO REMOVE EDIT', fts, removedFeature);
    setNewFeatures(fts);
    setNewErased(removedFeature[0]);
  };

  const removeFeature = () => {
    const erasedId = erased.id;
    console.log(campoInfo.features.filter(({ polygon }) => polygon.id === erasedId)[0], '????');
    const erasedCrop = Object.keys(erased).length > 0 && campoInfo.features.filter(({ polygon }) => polygon.id === erasedId)[0].crop;
    removeInput(erasedCrop);
    setFeatures(newFeatures);
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: campoInfo.features.filter(({ polygon }) => polygon.id !== erasedId),
    }));
  };

  console.log(cultivos);
  const cultivosInputs = cultivos.map((cultivo, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <label key={index} className="agregar-campo-label">
      Tipo de cultivo:
      <select className="select" value={cultivo} onChange={(e) => handleChange(e.target.value, index)}>
        {' '}
        {opciones}
        {' '}
      </select>
      {cultivos.length > 1 && <Button type="button" onClick={() => removeInput(cultivo)} className="green-button">-</Button>}
    </label>
  ));

  useEffect(() => {
    console.log(newFeatures, 'HAY NUEVAS FEATURES?');
    if (newFeatures.length !== 0 && areNewFeatures()) { addFeature(); }
  }, [newFeatures]);

  useEffect(() => {
    console.log(erased, 'QUE ES ERASED');
    if (campoInfo.features.length !== 0 && Object.keys(erased).length > 0) {
      console.log('Camp info', campoInfo, erased);
      removeFeature();
    }
  }, [erased]);

  useEffect(() => {
    setCultivos(cultivosSeleccionados);
  }, []);

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

  function sendData(endPoint, formData) {
    const accessToken = `Bearer ${userID}`;
    post(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
  }

  function editData(endPoint, formData) {
    const accessToken = `Bearer ${userID}`;
    patch(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
  }

  function guardarCampoInfo() {
    const valid = validateForm();
    if (!valid) {
      return;
    }
    console.log(campoInfo);
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

    console.log(formData, campoInfo, cultivos);
    console.log('PLOTS: ', plots, height, width, coordinates);

    if (edit) {
      // guardar campo editado
      editData(`field/${fieldID}`, formData);
    } else {
      sendData('field', formData);
    }
    nav(`/home/${userID}`);
  }

  const okay = () => {
    setinValid(false);
    setErrorMessage({ title: '', message: '' });
  };

  return (
    <div>
      <div className="tarjetas">
        {invalid
        && <ErrorModal title={errorMessage.title} message={errorMessage.message} onClick={okay} />}
        <Card className="agregar-campo-container max-content">
          <div className="campo" id="mapa">
            <AgroMap
              key="11233"
              coordinates={campoInfo.coordinates}
              changeCoordinates={(coord) => setCampoInfo((prevInfo) => ({
                ...prevInfo,
                coordinates: coord,
              }))}
              feats={campoInfo.features}
              addFeatures={setNewFeatures}
              removeFeature={(fts, removedFeature) => removeFeatureSt(fts, removedFeature)}
              featErased={featErasedId}
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
                {/* {drawField ? <p>Dibuje el campo principal</p> */}

                <div>
                  <p className="agregar-campo-label" style={{ textAlign: 'center !important', paddingLeft: '0.5rem' }}> Dibuje la superficie de cada lote con su cultivo asociado </p>
                  {cultivosInputs}
                  <Button type="button" onClick={addInput} className="green-button mas-button">+</Button>
                </div>

              </div>
              <div className="file-uploader-container">
                <FileUploader
                  handleChange={(img) => {
                    setCampoInfo((prevInfo) => ({
                      ...prevInfo,
                      imagen: img,
                    }));
                  }}
                  name="foto-campo"
                  types={fileTypes}
                  required
                  label="Suba o arrastre una imagen de su campo aqui"
                  classes="drop_area"
                  hoverTitle="Suelte la foto aqui "
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
                        Quitar Imagen
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
              </div>
            </form>
          </Card>

          <div className="botones">
            <Button type="button" onClick={() => nav(`/home/${userID}`)} className="green-button cancelar">Cancelar</Button>
            <Button type="button" onClick={() => guardarCampoInfo()} className="green-button">Guardar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

MapContainer.propTypes = {
  campInfo: PropTypes.object.isRequired,
  cultivosSeleccionados: PropTypes.arrayOf(PropTypes.string).isRequired,
  feats: PropTypes.arrayOf(PropTypes.object).isRequired,
  campoPrincipal: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
};
