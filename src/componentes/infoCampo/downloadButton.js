import React from 'react';
import './infoCampo.scss';

function DownloadButton() {
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${process.env.PUBLIC_URL}/data/template.csv`;
    downloadLink.download = 'template.csv';
    downloadLink.click();
  };

  return (
    <button onClick={handleDownload}>Descargar Template</button>
  );
}

export default DownloadButton;
