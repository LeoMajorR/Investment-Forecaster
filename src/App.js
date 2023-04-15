import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Financial Calculator
        </Typography>
        <TextField
          label="Amount Invested"
          value={amount}
          onChange={handleAmountChange}
          type="number"
          variant="outlined"
          margin="normal"
          sx={{ width: '50%' }}
        />
        <TextField
          label="Time"
          value={time}
          onChange={handleTimeChange}
          type="number"
          variant="outlined"
          margin="normal"
          sx={{ width: '50%' }}
        />
        <Button variant="contained" onClick={handleCalculate} sx={{ width: '50%', marginTop: 2 }}>
          Calculate
        </Button>
        {financialInstruments.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: '50%', marginTop: 4 }}>
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
                    <TableCell align="right">{instrument['Maturing Amount']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </Container>
  );
};

export default App;
