import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';



const App = () => {
  const [amount, setAmount] = useState(1000);
  const [time, setTime] = useState(3);
  const [financialInstruments, setFinancialInstruments] = useState([]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleCalculate = () => {
    axios
      .get(`http://127.0.0.1:8000/finCal/${amount}/${time}/`)
      .then((response) => {
        setFinancialInstruments(response.data['Financial Instruments']);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Financial Calculator</h1>
      <label>
        Amount Invested:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <br />
      <label>
        Time:
        <input type="number" value={time} onChange={handleTimeChange} />
      </label>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <br />
      {financialInstruments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Instrument Name</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Maturing Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financialInstruments.map((instrument, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {instrument['Instrument Name']}
                  </TableCell>
                  <TableCell align="right">{instrument['Rate']}</TableCell>
                  <TableCell align="right">
                    {instrument['Maturing Amount']}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default App;
