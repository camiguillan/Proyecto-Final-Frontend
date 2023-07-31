/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './infoCampo.scss';
import '../verCultivos/verCultivos.scss';
import Papa from 'papaparse';
import Chart from 'react-google-charts';
import Header from '../reusable/header/header';

export default function InfoCampo() {
  const { userID } = useParams();
  const { field } = useParams();
  const { crop } = useParams();
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [selectedButton, setSelectedButton] = useState('1');
  const [lineData, setLineData] = useState([[]]);

  const handleDataChange = (dataArray) => {
    const newData = lineData.slice();
    for (let i = 0; i < dataArray.length; i += 1) {
      newData.push([dataArray[i]]);
    }
    setLineData(newData);
    console.log(lineData);
  };

  const LineChartOptions = {
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Popularity',
    },
    series: {
      0: { curveType: 'function', pointShape: 'circle', pointSize: '10' },
    },
  };

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const processData = (csvData) => {
    const labels = [];
    const dataMap = new Map();
    const [a, otherName, name] = csvData[0];
    for (let i = 1; i < csvData.length - 1; i += 1) {
      const [cropCSV, xValue, yValue] = csvData[i];

      if (!dataMap.has(xValue)) {
        dataMap.set(xValue, Number(yValue));
      } else {
        dataMap.set(xValue, dataMap.get(xValue) + Number(yValue));
      }

      if (!labels.includes(xValue)) {
        labels.push(xValue);
      }
    }

    const data = labels.map((label) => dataMap.get(label));

    return data;
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        const data = processData(result.data);
        console.log('Data:', data);
        handleDataChange(data);
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

        {/* Agrega el formulario para cargar el archivo CSV */}
        <form>
          <input type="file" id="csvInput" accept=".csv" onChange={(e) => handleFileUpload(e)} />
          <button type="submit" onChange={handleFileUpload}>Cargar</button>
        </form>

        <div className="container mt-5">
          <Chart
            width="700px"
            height="410px"
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={lineData}
            options={LineChartOptions}
            rootProps={{ 'data-testid': '2' }}
          />
        </div>
      </div>
    </div>
  );
}
