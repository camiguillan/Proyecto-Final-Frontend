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
import cropCheckFullField from '../reusable/map/funcionesMapa';
import AgroMap from '../reusable/map/agroMap';
import Card from '../reusable/card/card';
import HeaderWhite from '../reusable/header_white/header_white';

export default function InfoCampo() {
  const { userID } = useParams();
  const { field } = useParams();
  const { crop } = useParams();
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('1');
  const [lineData, setLineData] = useState([['', crop]]);
  const [barData, setBarData] = useState([['', crop]]);
  const [searchTerm, setSearchTerm] = useState('lampara');
  const [products, setProducts] = useState([]);
  const [diagnostico, setdiagnostico] = useState(['EXCELENTE']);
  const [erased, setNewErased] = useState([]);
  const [newFeatures, setNewFeatures] = useState([]);

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

  useEffect(() => {
    handleSearch();
  }, []);

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
        </div>
        <div className="cards-container">
          <div className="cards-wrapper">
            <div className="circle-card first" />
            <div className="cards-titles">
              Total sembrado
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-card second" />
            <div className="cards-titles">
              Cultivo sano
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-card third" />
            <div className="cards-titles">
              NDVI
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-card fourth" />
            <div className="cards-titles">
              Humedad
            </div>
          </div>
        </div>
        <div className="file-upload-container">
          <DownloadButton />
          <input className="button-dashboard selected" type="file" id="csvInput" accept=".csv" onChange={(e) => handleFileUpload(e)} />
        </div>
        {lineData.length > 1 && (
        <div className="dashboards-container">
          <div className="dashboard">
            <Chart
              width="42.75rem"
              height="26rem"
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={lineData}
              options={lineChartOptions}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
          <div style={{ marginRight: '2rem' }} />
          <div className="dashboard">
            <Chart
              width="42.75rem"
              height="26rem"
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
        </div>
        <div className="cards-container">
          <Diagnostico diagnostico={diagnostico} />
          <div className="cards-wrapper">
            <img src={excelent} alt="Imagen 4" style={{ width: '7rem' }} />
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
