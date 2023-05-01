import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  Grid,
  Card,
  CardContent,
  AppBar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText, Toolbar
} from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: 900,
  },
  formControl: {
    margin: '20px 0',
  },
});

function FinancialCalculator() {
  const [amount, setAmount] = useState(10000);
  const [time, setTime] = useState(5);
  const [financialInstruments, setFinancialInstruments] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const[img1,setImg1]=useState('');
  const[img2,setImg2]=useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTimeChange = (e, value) => {
    setTime(value);
  };

  const handleCalculate = async () => {
    axios
      .get(`http://127.0.0.1:8000/finCal/${amount}/${time}/`)
      .then((response) => {
        setFinancialInstruments(response.data['Financial Instruments']);

        setShowCharts(true);
        setImg1("http://127.0.0.1:8000/"+response.data['Graphs']["bar3d"]);
        setImg2("http://127.0.0.1:8000/"+response.data['Graphs']["pie"]);
        console.log(response.data['Graphs']);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container sx={{width:'100%',}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          width: '100%',
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
        <Box sx={{ width: '40%', marginTop: 2 }}>
          <Typography id="time-slider-label">Time</Typography>
          <Slider
            value={time}
            onChange={handleTimeChange}
            valueLabelDisplay="auto"
            min={1}
            max={25}
            aria-labelledby="time-slider-label"
          />
        </Box>
        <Button variant="contained" onClick={handleCalculate} sx={{ width: '50%', marginTop: 2 }}>
          Forecast
        </Button>
              {showCharts && (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4, width:'100%' }}>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <img src={img1} alt="Bar chart" width="100%" />
      </Grid>
      <Grid item xs={6}>
        <img src={img2} alt="Pie chart" width="100%" />
      </Grid>
    </Grid>
  </Box>
)}
        {financialInstruments.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: '80%', marginTop: 4 }}>
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
}

function SIPCalculator() {
  const [amount, setAmount] = useState(10000);
  const [time, setTime] = useState(5);
  const [rate, setRate] = useState(15.0);
  const [results, setResults] = useState({});
  const[showPie,setShowPie]=useState(false);
  const[img3, setImg3]=useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSIPCalculate = async () => {
    axios
        .get(`http://127.0.0.1:8000/sip/${amount}/${time}/${rate}/`)
        .then((response) => {
          setResults(response.data);
          setImg3("http://127.0.0.1:8000/"+response.data['Graphs']);
          setShowPie(true);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
  <Typography variant="h4" gutterBottom>
    SIP Calculator
  </Typography>
  <Box mb={2}>
    <TextField id="amount" label="Amount" variant="outlined" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
  </Box>
  <Box mb={2}>
    <TextField id="time" label="Time" variant="outlined" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
  </Box>
  <Box display="flex" alignItems="center">
    <Typography variant="body1" style={{ marginRight: '10px' }}>
      Rate:
    </Typography>
    <Slider
      min={1.0}
      max={30.0}
      step={0.1}
      value={rate}
      onChange={(e, value) => setRate(value)}
      style={{ width: '200px' }}
    />
    <Typography variant="body1" style={{ marginLeft: '10px' }}>
      {rate.toFixed(1)}%
    </Typography>
  </Box>
  <Box mt={2}>
    <Button variant="contained" color="primary" onClick={handleSIPCalculate}>
      Invest
    </Button>
  </Box>
  {results.hasOwnProperty('Invested Amount') && (
    <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap">
      <Box mr={4}>
        <img src={img3} alt="Chart" width="400" height="300" />
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Results:
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Amount Invested:</TableCell>
              <TableCell>{results['Invested Amount']}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Estimated Return:</TableCell>
              <TableCell>{results['Estimated Return']}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Value:</TableCell>
              <TableCell>{results['Total Value']}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  )}
</Box>

  );
}

function App() {
  const [activeTab, setActiveTab] = useState('financial');
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6">Your App Name</Typography>
        <Tabs value={activeTab} onChange={handleChange} aria-label="calculator tabs" sx={{ justifyContent: 'center' }}>
          <Tab value="financial" label="Financial Calculator" />
          <Tab value="sip" label="SIP Calculator" />
        </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box mt={4}>
          {activeTab === 'financial' ? <FinancialCalculator /> : <SIPCalculator />}
        </Box>
      </Container>
      <style>
        {`
          .MuiTab-root {
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}


export default App;

