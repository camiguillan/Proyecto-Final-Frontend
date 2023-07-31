/* eslint-disable no-new */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './infoCampo.scss';
import '../verCultivos/verCultivos.scss';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import Header from '../reusable/header/header';

export default function InfoCampo() {
  const { userID } = useParams();
  const { field } = useParams();
  const { crop } = useParams();
  const user = JSON.parse(localStorage.getItem('name')) || {};
  const [selectedButton, setSelectedButton] = useState('1');

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const processData = (csvData) => {
    const labels = [];
    const dataMap = new Map();
    for (let i = 1; i < csvData.length; i += 1) {
      const [cropCSV, xValue, yValue] = csvData[i];

      if (!dataMap.has(xValue)) {
        dataMap.set(xValue, Number(yValue));
        console.log(dataMap);
      } else {
        dataMap.set(xValue, dataMap.get(xValue) + Number(yValue));
        console.log(dataMap);
      }

      if (!labels.includes(xValue)) {
        labels.push(xValue);
      }
    }

    const data = labels.map((label) => dataMap.get(label));

    return { labels, data };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const createLineChart = (labels, data) => {
      const ctx = document.getElementById('lineChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Datos',
              data,
              borderColor: 'blue',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    Papa.parse(file, {
      complete: (result) => {
        const { labels, data } = processData(result.data);
        createLineChart(labels, data);
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
          <input type="file" id="csvInput" accept=".csv" onChange={handleFileUpload} />
          <button type="submit">Cargar</button>
        </form>

        {/* Agrega un elemento canvas para el gráfico */}
        <canvas id="lineChart" width="400" height="200" />
      </div>
    </div>
  );
}
