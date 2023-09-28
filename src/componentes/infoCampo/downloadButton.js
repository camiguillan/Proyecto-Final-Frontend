import React from 'react';
import './infoCampo.scss';
import { Button } from 'react-bootstrap';

function DownloadButton() {
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${process.env.PUBLIC_URL}/data/template.csv`;
    downloadLink.download = 'template.csv';
    downloadLink.click();
  };

  return (
    <Button variant="outline-primary" className="button-desc" onClick={handleDownload}>Descargar Template</Button>
  );
}

export default DownloadButton;
