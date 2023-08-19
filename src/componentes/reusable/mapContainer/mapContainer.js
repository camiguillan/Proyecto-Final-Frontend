/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
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
// eslint-disable-next-line import/no-named-as-default
import cropCheckFullField from '../map/funcionesMapa';
import { patch, post } from '../../conexionBack/conexionBack';
import { CROP_TYPES_TRANSLATIONS } from '../../../constants/translations';
import ErrorModal from '../errorFolder/errores';

export default function MapContainer({
  campInfo, cultivosSeleccionados, feats, edit,
}) {
  const { userID } = useParams();
  const { fieldID } = useParams();
  const nav = useNavigate();

  const fileTypes = ['JPG', 'PNG'];
  const [campoInfo, setCampoInfo] = useState(campInfo);

  const [cultivos, setCultivos] = useState([...cultivosSeleccionados]);
  const [features, setFeatures] = useState(feats);
  const [newFeatures, setNewFeatures] = useState([]);
  const [erased, setNewErased] = useState([]);
  const [featErasedId, setNewErasedId] = useState('');
  const cultivosOpciones = Object.values(CROP_TYPES_KEYS);
  const [invalid, setinValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });
  const [selectedCrop, setSelectedCrop] = useState(CROP_TYPES_KEYS.NONE);
  console.log(campoInfo, 'campo info');

  const handleChange = (cultivo, index) => {
    const tempList = [...cultivos];
    tempList[index] = cultivo;
    const list2 = [...campoInfo.features];
    if (list2.length >= index + 1) {
      list2[index].crop = cultivo;
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
    }
  };

  const removeFeatureSt = (fts, removedFeature) => {
    setNewFeatures(fts);
    setNewErased(removedFeature[0]);
  };

  const removeFeature = () => {
    const erasedId = erased.id;
    const erasedCrop = Object.keys(erased).length > 0 && campoInfo.features.filter(({ polygon }) => polygon.id === erasedId)[0].crop;
    removeInput(erasedCrop);
    setFeatures(newFeatures);
    setCampoInfo((prevInfo) => ({
      ...prevInfo,
      features: campoInfo.features.filter(({ polygon }) => polygon.id !== erasedId),
    }));
  };

  const cultivosInputs = cultivos.map((cultivo, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <label key={index} className={!edit ? 'agregar-campo-label' : 'agregar-campo-label-edit'}>
      Tipo de cultivo:
      <select
        className="select"
        value={cultivo}
        onChange={(e) => handleChange(e.target.value, index)}
      >
        {' '}
        {opciones}
        {' '}
      </select>
      {!edit && cultivos.length > 1 && <Button type="button" onClick={() => removeInput(cultivo)} className="green-button">-</Button>}
    </label>
  ));

  useEffect(() => {
    if (newFeatures.length !== 0 && areNewFeatures()) { addFeature(); }
  }, [newFeatures]);

  useEffect(() => {
    if (campoInfo.features.length !== 0 && Object.keys(erased).length > 0) {
      removeFeature();
    }
  }, [erased]);

  useEffect(() => {
    setCultivos(cultivosSeleccionados);
  }, []);

  function validateForm() {
    if (campoInfo.nombreCampo === '') {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor complete el nombre de su campo',
      });
      setinValid(true);
      return false;
    }
    if (!edit && (cultivos.filter((cultivo) => cultivo === CROP_TYPES_KEYS.NONE).length > 1
    || campoInfo.features.length === 0)) {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor complete el dibujo de su campo o el tipo de cultivo que posee su lote',
      });
      setinValid(true);
      return false;
    }
    if (campoInfo.imagen === '') {
      setErrorMessage({
        title: 'No se puede enviar su solicitud',
        message: 'Por favor suba una foto de su campo',
      });
      setinValid(true);
      return false;
    }
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
    const {
      plots, height, width, coordinates,
    } = cropCheckFullField(campoInfo.features);
    const formData = new FormData();
    formData.append('name', campoInfo.nombreCampo);
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append('plots', JSON.stringify(plots));
    formData.append('height', height);
    formData.append('width', width);
    formData.append('image', campoInfo.imagen);

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
              edit={edit}
            />
          </div>
        </Card>
        <div className="derecha">
          <Card className="agregar-campo-container min-content">
            <form className="form">
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
                  <p className="agregar-campo-label" style={{ textAlign: 'center !important' }}>
                    {!edit ? 'Dibuje la superficie de cada lote con su cultivo asociado' : '' }
                  </p>
                  {cultivosInputs}
                  {!edit && <Button type="button" onClick={addInput} className="green-button mas-button">+</Button>}
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
  edit: PropTypes.bool.isRequired,
};
