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
import Header from '../reusable/header/header';

export default function InfoCampo() {
  const { userID } = useParams();
  const { field } = useParams();
  const { crop } = useParams();
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [selectedButton, setSelectedButton] = useState('1');
  const [lineData, setLineData] = useState([['', crop]]);
  const [barData, setBarData] = useState([['', crop]]);
  const [fileButtonText, setfileButtonText] = useState('Cargar archivo');

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
    const newData = lineData.slice();
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

  useEffect(() => {
  }, [lineData]);

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
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
    setLineData([['', '']]);
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

  return (
    <div className="layout">
      <Header />
      <div className="gray-space">
        <h1 className="titulo-fachero-facherito">Dashboards</h1>
        <div className="buttons-container">
          <button
            className={selectedButton === '1' ? 'button selected' : 'button'}
            onClick={() => handleButtonClick('1')}
          >
            Última semana
            <div className={selectedButton === '1' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedButton === '2' ? 'button selected' : 'button'}
            onClick={() => handleButtonClick('2')}
          >
            Último mes
            <div className={selectedButton === '2' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedButton === '3' ? 'button selected' : 'button'}
            onClick={() => handleButtonClick('3')}
          >
            Último año
            <div className={selectedButton === '3' ? 'selected-line' : ''} />
          </button>
          <button
            className={selectedButton === '4' ? 'button selected' : 'button'}
            onClick={() => handleButtonClick('4')}
          >
            Historial completo
            <div className={selectedButton === '4' ? 'selected-line' : ''} />
          </button>
        </div>
        <div className="cards-container">
          <div className="cards-wrapper">
            <div className="circle-first-card" />
            <div className="cards-titles">
              Total sembrado
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-second-card" />
            <div className="cards-titles">
              Cultivo sano
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-third-card" />
            <div className="cards-titles">
              NDVI
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="circle-fourth-card" />
            <div className="cards-titles">
              Humedad
            </div>
          </div>
        </div>
        <div className="file-upload-container">
          <DownloadButton />
          <input className="button selected" type="file" id="csvInput" accept=".csv" onChange={(e) => handleFileUpload(e)} />
        </div>
        {lineData.length > 1 && (
        <div className="dashboards-container">
          <Chart
            width="42.75rem"
            height="26rem"
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={lineData}
            options={lineChartOptions}
            rootProps={{ 'data-testid': '2' }}
          />
          <div style={{ marginRight: '2rem' }} />
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
        )}
      </div>
    </div>
  );
}
