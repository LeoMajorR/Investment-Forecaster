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
  const [months, setMonths] = useState(0);
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

  const handleMonthChange = (e, value) => {
    setMonths(value);
  };

  const handleCalculate = async () => {
    axios
      .get(`http://127.0.0.1:8000/finCal/${amount}/${time}/${months}/`)
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
        <Box sx={{ width: '20%', marginTop: 2 }}>
          <Typography id="months-slider-label">Months</Typography>
          <Slider
            value={months}
            onChange={handleMonthChange}
            valueLabelDisplay="auto"
            min={0}
            max={12}
            aria-labelledby="months-slider-label"
          />
        </Box>
        <Box sx={{ width: '40%', marginTop: 2 }}>
          <Typography id="time-slider-label">Years</Typography>
          <Slider
            value={time}
            onChange={handleTimeChange}
            valueLabelDisplay="auto"
            min={0}
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
          <TableContainer component={Paper} sx={{ width: '80%', marginTop: 4}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Instrument Name</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="left" paddingLeft='10vh'>Maturing Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {financialInstruments.map((instrument, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {instrument['Instrument Name']}
                    </TableCell>
                    <TableCell align="right">{instrument['Rate']}%</TableCell>
                    <TableCell align="left" sx={{paddingLeft:"50px"}}>Rs. {instrument['Maturing Amount']}</TableCell>
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
    // <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          width: '100%',
        }}>
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
  <Box mt={4}>
    <Typography variant="h5" gutterBottom>
      SIP Calculator – Systematic Investment Plan Calculator
    </Typography>
    <Typography variant="body1" gutterBottom>
      SIP is a method of investing a fixed sum, regularly, in a mutual fund scheme. SIP allows one to buy units on a 
      given date each month, so that one can implement a saving plan for themselves. The biggest advantage of SIP is 
      that one need not time the market. In addition, one need not worry about ups and downs of the market. 
      Some of the key benefits of SIP are:
    </Typography>
    <ul>
      <li>
        <Typography variant="body1" gutterBottom>
          Rupee cost averaging
        </Typography>
      </li>
      <li>
        <Typography variant="body1" gutterBottom>
          Power of compounding
        </Typography>
      </li>
      <li>
        <Typography variant="body1" gutterBottom>
          Flexibility
        </Typography>
      </li>
      <li>
        <Typography variant="body1" gutterBottom>
          No need to time the market
        </Typography>
      </li>
    </ul>
</Box>
<Box mt={4}>
  <Typography variant="h5" gutterBottom>
    How to use SIP Calculator?
  </Typography>
  <Typography variant="body1" gutterBottom>
    A SIP plan calculator works on the following formula:
    <br/>
    <br/>
      {`M = P * ({(1 + i)^n - 1}/i)* (1 + i)`}
      <br />
  <br />
  In the above formula –
  <ul>
    <li>M is the amount you receive upon maturity.</li>
    <li>P is the amount you invest at regular intervals.</li>
    <li>n is the number of payments you have made.</li>
    <li>i is the periodic rate of interest.</li>
  </ul>
  Take for example you want to invest Rs. 1,000 per month for 12 months at a periodic rate of interest of 12%.
  <br />
  <br />
  then the monthly rate of return will be 12%/12 = 1/100=0.01
  <br />
  <br />
  Hence, M = {'1000 * ((1.01^12 - 1)/0.01) * (1.01) = Rs 13,184'}
  <br />
  <br />
  which gives Rs 13,184 approximately in a year.
  <br />
  <br />
  The rate of interest on a SIP will differ as per market conditions. It may increase or decrease, which will change the estimated returns.

    </Typography>
    </Box>
</Box>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('financial');
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">BTP Project</Typography>
          <Tabs value={activeTab} onChange={handleChange} aria-label="calculator tabs" sx={{ justifyContent: 'center' }}>
            <Tab value="financial" label="Financial Calculator" />
            <Tab value="sip" label="SIP Calculator" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div style={{ flexGrow: 1, marginTop: '2rem', marginBottom: '2rem' }}>
        <Container maxWidth="lg">
          <Box mt={4} style={{ minHeight: "calc(100vh - 200px)" }}>
  {activeTab === 'financial' ? <FinancialCalculator /> : <SIPCalculator />}
</Box>

          {/* {activeTab === 'financial' ? <FinancialCalculator /> : <SIPCalculator />} */}
        </Container>
      </div>
      <AppBar position="static" style={{ backgroundColor: '#222', top: 'auto', bottom: 0 }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://i.ibb.co/TtWCnHS/800px-Indian-Institute-of-Technology-Goa-Logo-svg-removebg-preview.png" alt="IIT Goa logo" style={{ height: '2rem', marginRight: '1rem' }} />
            <Typography variant="body2" style={{ color: '#fff' }}>
              BTP Project By: Vivek Narway
            </Typography>
          </div>
          <Typography variant="body2" style={{ color: '#fff' }}>
            Under Professor: Dr. Sharad Sinha<br />
            Institute: IIT Goa
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default App;

