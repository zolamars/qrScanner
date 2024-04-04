// QRScanner.js
import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '@mui/material';

const QRScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const resetResult = () => {
    setResult('');
  };

  return (
    <div>
      <Scanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
      <Button variant="contained" color="primary" onClick={resetResult}>Reset</Button>
    </div>
  );
};

export default QRScanner;
