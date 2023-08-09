/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/order */
/* eslint-disable prefer-const */
/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './infoCampo.scss';
import '../verCultivos/verCultivos.scss';
import Papa from 'papaparse';
import Chart from 'react-google-charts';
import DownloadButton from './downloadButton';
import Diagnostico from './diagnostico';
import axios from 'axios';
import ProductCard from './meliCard';
import excelent from '../../images/excelent.png';
import upLine from '../../images/ascending.png';
import downLine from '../../images/descending.png';
import cropCheckFullField from '../reusable/map/funcionesMapa';
import AgroMap from '../reusable/map/agroMap';
import Card from '../reusable/card/card';
import HeaderWhite from '../reusable/header_white/header_white';
import { differenceInDays } from 'date-fns';
import VerCampo from '../verCampo/verCampo';

export default function InfoCampo() {
  const { userID } = useParams();
  const { field } = useParams();
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [crop, setCrop] = useState('Todos');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('LastWeek');
  const [lineData, setLineData] = useState([['', crop]]); // VER ESTO
  const [barData, setBarData] = useState([['', crop]]); // VER ESTO
  const [searchTerm, setSearchTerm] = useState('lampara');
  const [products, setProducts] = useState([]);
  const [diagnostico, setdiagnostico] = useState(['GOOD']);
  const [erased, setNewErased] = useState([]);
  const [newFeatures, setNewFeatures] = useState([]);
  const [metrosCuadrados, setMetrosCuadrados] = useState([]);
  const [porcentajeSano, setporcentajeSano] = useState([]);
  const [ndvi, setNdvi] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [metrosCuadradosViejo, setMetrosCuadradosviejo] = useState([]);
  const [porcentajeSanoviejo, setporcentajeSanoviejo] = useState([]);
  const [ndviviejo, setNdviviejo] = useState([]);
  const [humedadviejo, setHumedadviejo] = useState([]);
  const [fieldRest, setField] = useState(field);
  const today = new Date();
  const traducciones = {
    Girasol: {
      cultivo: 'sunflower',
    },
    Soja: {
      cultivo: 'soy',
    },
    Trigo: {
      cultivo: 'wheat',
    },
    Maiz: {
      cultivo: 'corn',
    },
    Todos: {
      cultivo: 'todos',
    },
  };

  const [campoInfo, setCampoInfo] = useState({
    nombreCampo: '',
    imagen: '',
    coordinates: [-58.702963, -34.671792],
    features: [],
  });

  const removeFeatureSt = (feats, removedFeature) => {
    setNewFeatures(feats);
    setNewErased(removedFeature[0]);
  };

  const [lineChartOptions, setlineChartOptions] = useState({
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    colors: ['#2a7d2e'], // Uso Main green, pero no me deja poner la variable
    series: {
      0: { curveType: 'normal', pointShape: 'circle', pointSize: '7' },
    },
  });

  const [barChartOptions, setBarChartOptions] = useState({
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    colors: ['#2a7d2e'], // Uso Main green, pero no me deja poner la variable
    series: {
      0: { curveType: 'normal', pointShape: 'circle', pointSize: '7' },
    },
  });

  const handleDataChange = (years, dataArray, xName, yName, magicNumber) => {
    const newData = ([['', crop]]);
    if (magicNumber === 1) {
      setLineData([['', crop]]);
    } else {
      setBarData([['', crop]]);
    }
    for (let i = 0; i < dataArray.length; i += 1) {
      newData.push([dataArray[i], years[i]]);
    }
    if (magicNumber === 1) {
      setLineData(newData);
      setlineChartOptions((prevOptions) => ({
        ...prevOptions,
        hAxis: { ...prevOptions.hAxis, title: xName },
        vAxis: { ...prevOptions.vAxis, title: yName },
      }));
    } else {
      setBarData(newData);
      setBarChartOptions((prevOptions) => ({
        ...prevOptions,
        hAxis: { ...prevOptions.hAxis, title: xName },
        vAxis: { ...prevOptions.vAxis, title: yName },
      }));
    }
  };

  const handleButtonClick = (buttonText) => {
    setSelectedTimePeriod(buttonText);
    if (selectedTimePeriod === 'LastWeek') {
      console.log('LastWeek');
    } else if (selectedTimePeriod === 'LastMonth') {
      console.log('LastMonth');
    } else if (selectedTimePeriod === 'LastYear') {
      console.log('LastYear');
    } else {
      console.log('FullHistory');
    }
  };

  const processData = (csvData) => {
    const labels = [];
    const valoresY = [];
    const dataMap = new Map();
    const [a, otherName, name] = csvData[0];
    for (let i = 1; i < csvData.length - 1; i += 1) {
      const [cropCSV, xValue, yValue] = csvData[i];
      if (cropCSV === crop) {
        if (!dataMap.has(xValue)) {
          dataMap.set(xValue, Number(yValue));
        } else {
          dataMap.set(xValue, dataMap.get(xValue) + Number(yValue));
        }
        if (!labels.includes(xValue)) {
          labels.push(xValue);
        }
      }
    }
    dataMap.forEach((value) => {
      valoresY.push(value);
    });
    const years = labels.map((label) => dataMap.get(label));
    const data = valoresY.map((valorY) => dataMap.get(valorY));
    return {
      years, data, otherName, name,
    };
  };

  const processDataBar = (csvData) => {
    const labels = [];
    const valoresY = [];
    const dataMap = new Map();
    const [a, otherName, x, name] = csvData[0];
    for (let i = 1; i < csvData.length - 1; i += 1) {
      const [cropCSV, xValue, yValue, yValueBar] = csvData[i];
      if (cropCSV === crop) {
        if (!dataMap.has(xValue)) {
          dataMap.set(xValue, Number(yValueBar));
        } else {
          dataMap.set(xValue, dataMap.get(xValue) + Number(yValueBar));
        }
        if (!labels.includes(xValue)) {
          labels.push(xValue);
        }
      }
    }
    dataMap.forEach((value) => {
      valoresY.push(value);
    });
    const years = labels.map((label) => dataMap.get(label));
    const data = valoresY.map((valorY) => dataMap.get(valorY));
    return {
      years, data, otherName, name,
    };
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    Papa.parse(file, {
      complete: (result) => {
        const {
          years, data, otherName, name,
        } = processData(result.data);
        handleDataChange(years, data, otherName, name, 1);
      },
    });
    Papa.parse(file, {
      complete: (result) => {
        const {
          years, data, otherName, name,
        } = processDataBar(result.data);
        handleDataChange(years, data, otherName, name, 2);
      },
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`,
      );
      setProducts(response.data.results);
    } catch (error) {
      console.error('Error fetching data from MercadoLibre API:', error);
    }
  };

  const metricsForMenu = () => {
    let metros = 0;
    let sano = 0;
    const cultivo = traducciones[crop].cultivo;
    let ndviTemp = 0;
    let humedadTemp = 0;
    let cuantosPlots = 0;
    let fullHistory = false;
    const fechaActual = new Date();
    const fechaAUsar = new Date(fechaActual);
    let diferenciaMenor = Number.MAX_VALUE;
    let huboAlguno = false;
    if (selectedTimePeriod === 'LastWeek') {
      const diasArestar = 7;
      fechaAUsar.setDate(fechaActual.getDate() - diasArestar);
    } else if (selectedTimePeriod === 'LastMonth') {
      const diasArestar = 30;
      fechaAUsar.setDate(fechaActual.getDate() - diasArestar);
    } else if (selectedTimePeriod === 'LastYear') {
      const diasArestar = 365;
      fechaAUsar.setDate(fechaActual.getDate() - diasArestar);
    } else if (selectedTimePeriod === 'FullHistory') {
      fullHistory = true;
    }

    user.fields.forEach((fiel, index) => {
      if (fiel._id === field) {
        user.fields[index].plots.forEach((plot) => {
          if (plot.crop === cultivo || crop === 'Todos') {
            diferenciaMenor = Number.MAX_VALUE;
            huboAlguno = false;
            let indexAusar = 0;
            plot.history.forEach((instance, index2) => {
              if (index2 !== 0) {
                const fechaInstancia = new Date(instance.createdAt);
                const diferenciaNueva = differenceInDays(fechaActual, fechaInstancia);
                if (diferenciaNueva <= diferenciaMenor && fechaInstancia <= fechaAUsar) {
                  diferenciaMenor = diferenciaNueva;
                  indexAusar = index2;
                  huboAlguno = true;
                }
              }
            });
            if ((plot.history[indexAusar].diagnostics === 'excelent' || plot.history[indexAusar].diagnostics === 'very_good' || plot.history[indexAusar].diagnostics === 'good') && huboAlguno) {
              sano += 121;
            } if (huboAlguno) {
              metros += 121;
              cuantosPlots += 1;
              ndviTemp += plot.history[indexAusar].ndvi;
              humedadTemp += plot.history[indexAusar].humidity;
              console.log('El ndvi :', ndviTemp);
              console.log('El :', metros);
            }
          }
        });
        ndviTemp = (ndviTemp / cuantosPlots).toFixed(2);
        humedadTemp = (humedadTemp / cuantosPlots).toFixed(2);
        const porcentajeSanou = (sano * 100) / metros;
        const porcentajeSanoRedondeado = parseFloat(porcentajeSanou).toFixed(2);
        setporcentajeSanoviejo(Math.round(((porcentajeSano - porcentajeSanoRedondeado) / Math.abs(porcentajeSanoRedondeado)) * 100));
        setNdviviejo(Math.round(((ndvi - ndviTemp) / Math.abs(ndviTemp)) * 100));
        setHumedadviejo(Math.round(((humedad - humedadTemp) / Math.abs(humedadTemp)) * 100));
        setMetrosCuadradosviejo(Math.round(((humedad - metros) / Math.abs(metros)) * 100));
        return;
      }
    });
  };

  const metrics = () => {
    let metros = 0;
    let sano = 0;
    const cultivo = traducciones[crop].cultivo;
    let ndviTemp = 0;
    let humedadTemp = 0;
    let cuantosPlots = 0;
    const fechaActual = new Date();
    let diferenciaMenor = Number.MAX_VALUE;

    user.fields.forEach((fiel, index) => {
      if (fiel._id === field) {
        user.fields[index].plots.forEach((plot) => {
          if (plot.crop === cultivo || crop === 'Todos') {
            diferenciaMenor = Number.MAX_VALUE;
            metros += 121;
            let indexAusar = 0;
            plot.history.forEach((instance, index2) => {
              if (index2 !== 0) {
                const fechaInstancia = new Date(instance.createdAt);
                const diferenciaNueva = differenceInDays(fechaActual, fechaInstancia);
                if (diferenciaNueva <= diferenciaMenor) {
                  diferenciaMenor = diferenciaNueva;
                  indexAusar = index2;
                }
              }
            });
            if (plot.history[indexAusar].diagnostics === 'excelent' || plot.history[indexAusar].diagnostics === 'very_good' || plot.history[indexAusar].diagnostics === 'good') {
              sano += 121;
            }
            cuantosPlots += 1;
            ndviTemp += plot.history[indexAusar].ndvi;
            humedadTemp += plot.history[indexAusar].humidity;
          }
        });
        ndviTemp = (ndviTemp / cuantosPlots).toFixed(2);
        humedadTemp = (humedadTemp / cuantosPlots).toFixed(2);
        setNdvi(ndviTemp);
        setHumedad(humedadTemp);
        const porcentajeSanou = (sano * 100) / metros;
        const porcentajeSanoRedondeado = parseFloat(porcentajeSanou).toFixed(1);
        setporcentajeSano(porcentajeSanoRedondeado);
        setMetrosCuadrados(metros);
        return;
      }
    });
  };

  const handleFieldChange = (event) => {
    setField(event.target.value);
    metrics();
  };

  const handleCropChange = (event) => {
    setCrop(event.target.value);
  };

  useEffect(() => {
    metrics();
  }, [crop]);

  useEffect(() => {
    metricsForMenu();
  }, [selectedTimePeriod]);

  useEffect(() => {
    metrics();
  }, [field]);

  useEffect(() => {
    handleSearch();
    metrics();
  }, []);

  useEffect(() => {
    metricsForMenu();
  }, [metrosCuadrados, porcentajeSano, humedad, ndvi]);

  return (
    <div>
      <HeaderWhite />
      <div className="gray-space">
        <text className="titulo-fachero-facherito">Dashboards</text>
        <div className="buttons-container">
          <button
            className={selectedTimePeriod === 'LastWeek' ? 'button-dashboard selected' : 'button-dashboard'}
            onClick={() => handleButtonClick('LastWeek')}
          >
            Última semana
            <div className={selectedTimePeriod === 'LastWeek' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedTimePeriod === 'LastMonth' ? 'button-dashboard selected' : 'button-dashboard'}
            onClick={() => handleButtonClick('LastMonth')}
          >
            Último mes
            <div className={selectedTimePeriod === 'LastMonth' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedTimePeriod === 'LastYear' ? 'button-dashboard selected' : 'button-dashboard'}
            onClick={() => handleButtonClick('LastYear')}
          >
            Último año
            <div className={selectedTimePeriod === 'LastYear' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedTimePeriod === 'FullHistory' ? 'button-dashboard selected' : 'button-dashboard'}
            onClick={() => handleButtonClick('FullHistory')}
          >
            Historial completo
            <div className={selectedTimePeriod === 'FullHistory' ? 'selected-line' : ''} />
          </button>
          <div className="dropdown-container">
            <select
              className="rounded-dropdown"
              value={fieldRest} // Aquí establecemos el valor seleccionado
              onChange={handleFieldChange}
            >
              {user.fields.map((fiel, index) => (
                <option key={index} value={fiel._id}>
                  {fiel.name}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-container">
            <select
              className="rounded-dropdown rounded-dropdown-cultivos"
              value={crop} // Aquí establecemos el valor seleccionado
              onChange={handleCropChange}
            >
              <option value="Soja">Soja</option>
              <option value="Maiz">Maiz</option>
              <option value="Trigo">Trigo</option>
              <option value="Girasol">Girasol</option>
              <option value="Todos">Todos</option>
            </select>
          </div>
        </div>
        <div className="cards-container">
          <div className="cards-wrapper">
            <div className="circle-card first" />
            <div className="cards-titles">
              Total sembrado
            </div>
            {(metrosCuadrados < 0 || metrosCuadrados >= 0) && metrosCuadrados !== Infinity ? (
              <div className="cards-Subtitle">
                {Number(metrosCuadrados).toLocaleString()}
                <span>m2</span>
              </div>
            ) : (
              <div className="cards-Subtitle-no-data">
                No hay datos
              </div>
            )}
            {(metrosCuadradosViejo < 0 || metrosCuadradosViejo >= 0) && metrosCuadradosViejo !== Infinity ? (
              <div className={metrosCuadradosViejo < 0 ? 'cards-Subtitle-old-origin red' : 'cards-Subtitle-old-origin green'}>
                {metrosCuadradosViejo}
                %
              </div>
            ) : null}

            {(metrosCuadradosViejo < 0 || metrosCuadradosViejo >= 0) && metrosCuadradosViejo !== Infinity ? (
              <img src={metrosCuadradosViejo < 0 ? downLine : upLine} alt="Line Image" className="upLineImage upLineImageMetros" />
            ) : null}
          </div>
          <div className="cards-wrapper">
            <div className="circle-card second" />
            <div className="cards-titles">
              Cultivo sano
            </div>
            {(porcentajeSano < 0 || porcentajeSano >= 0) && porcentajeSano !== Infinity ? (
              <div className="cards-Subtitle cards-Subtitle2">
                {porcentajeSano}
                %
              </div>
            ) : (
              <div className="cards-Subtitle-no-data cards-Subtitle2">
                No hay datos
              </div>
            )}
            {(porcentajeSanoviejo < 0 || porcentajeSanoviejo >= 0) && porcentajeSanoviejo !== Infinity ? (
              <div className={porcentajeSanoviejo < 0 ? 'cards-Subtitle-old-origin red' : 'cards-Subtitle-old-origin green'}>
                {porcentajeSanoviejo}
                %
              </div>
            ) : null}
            {(porcentajeSanoviejo < 0 || porcentajeSanoviejo >= 0) && porcentajeSanoviejo !== Infinity ? (
              <img src={porcentajeSanoviejo < 0 ? downLine : upLine} alt="Line Image" className="upLineImage upLineImageSano" />
            ) : null}
          </div>
          <div className="cards-wrapper">
            <div className="circle-card third" />
            <div className="cards-titles">
              NDVI
            </div>
            {(ndvi < 0 || ndvi >= 0) && ndvi !== Infinity ? (
              <div className="cards-Subtitle cards-Subtitle3">
                {ndvi}
              </div>
            ) : (
              <div className="cards-Subtitle-no-data cards-Subtitle3">
                No hay datos
              </div>
            )}
            {(ndviviejo < 0 || ndviviejo >= 0) && ndviviejo !== Infinity ? (
              <div className={ndviviejo < 0 ? 'cards-Subtitle-old-origin red' : 'cards-Subtitle-old-origin green'}>
                {ndviviejo}
                %
              </div>
            ) : null}
            {(ndviviejo < 0 || ndviviejo >= 0) && ndviviejo !== Infinity ? (
              <img src={ndviviejo < 0 ? downLine : upLine} alt="Line Image" className="upLineImage upLineImagendvi" />
            ) : null}
          </div>
          <div className="cards-wrapper">
            <div className="circle-card fourth" />
            <div className="cards-titles">
              Humedad
            </div>
            {(humedad < 0 || humedad >= 0) && humedad !== Infinity ? (
              <div className="cards-Subtitle cards-Subtitle4">
                {humedad}
              </div>
            ) : (
              <div className="cards-Subtitle-no-data cards-Subtitle4">
                No hay datos
              </div>
            )}
            {(humedadviejo < 0 || humedadviejo >= 0) && humedadviejo !== Infinity ? (
              <div className={humedadviejo < 0 ? 'cards-Subtitle-old-origin red' : 'cards-Subtitle-old-origin green'}>
                {humedadviejo}
                %
              </div>
            ) : null}
            {(humedadviejo < 0 || humedadviejo >= 0) && humedadviejo !== Infinity ? (
              <img src={humedadviejo < 0 ? downLine : upLine} alt="Line Image" className="upLineImage" />
            ) : null}
          </div>
        </div>
        <div className="file-upload-container">
          <DownloadButton />
          <input className="button-dashboard selected" type="file" id="csvInput" accept=".csv" onChange={(e) => handleFileUpload(e)} />
        </div>
        {lineData.length > 1 && (
        <div className="dashboards-container" style={{ marginTop: '1.5rem' }}>
          <div className="dashboard">
            <Chart
              width="40rem"
              height="25rem"
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={lineData}
              options={lineChartOptions}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
          <div style={{ marginRight: '1.5rem' }} />
          <div className="dashboard">
            <Chart
              width="40rem"
              height="25rem"
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={barData}
              options={barChartOptions}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>
        )}
        <div className="cards-container2">
          <Card className="mapa-card max-content">
            <div className="campo-mapa-cultivo" id="mapa">
              <VerCampo campoInfo={campoInfo} />
            </div>
          </Card>
        </div>
        <div className="cards-container">
          <Diagnostico diagnostico={diagnostico} />
          <div className="cards-wrapper-diagnostico">
            <img src={excelent} alt="Imagen 4" style={{ width: '7rem', marginRight: '-1rem', marginLeft: '1rem' }} />
          </div>
        </div>
        <div className="cards-container">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
