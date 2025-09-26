import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM'
  }
})

let cancelAxios = null;
function App() {
  const [temp, setTemp] = useState({
    number: null,
    description: '',
    min: null,
    max: null,
    icon: null,
  });

  useEffect(() => {
    axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=e74d76f86bacc61e288f8127b8ff2cd0',
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        })
      }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        console.log(response);
        setTemp({
          number: responseTemp,
          description,
          min,
          max,
          icon,
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    return () => {
      console.log('canseling')
      cancelAxios();
    }
  },[]);
  return (
    <>
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
          {/* card */}
          <div dir='rtl' style={{
            backgroundColor: 'rgb(28 52 91 / 364', 
            color: '#fff', 
            padding: '10px',
            borderRadius: '15px',
            boxShadow: '0px 11px 1px rgba(0, 0, 0, 0.05)',
            width: '100%',
            }}
          >
            {/* content */}
            <div>

              {/* Cite & time */}
              <div dir='rtl' 
                style={{
                  display: 'flex', 
                  justifyContent: 'start', 
                  alignItems: 'end',
                }}
              >
              <Typography variant="h2" 
                style={{marginRight: '15px', fontWeight: 'bold'}}
              >
                القاهره
              </Typography>

              <Typography variant="h5" style={{marginRight: '15px'}}>
                ٢٣ مارس ٢٠٢٤
              </Typography>
              </div>
              {/* ==== Cite & time */}
              
              <hr />
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {/* degree & description */}
                <div>

                  {/* tempreture */}
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h1" 
                      style={{textAlign: 'right'}}
                    >
                      {temp.number}
                    </Typography>

                    {/* TODO temp image */}
                    <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt="icon for sky" />
                  </div>
                  {/*==== tempreture ====*/}

                  <Typography variant="h6" 
                      style={{textAlign: 'right'}}
                  >
                    {temp.description}
                  </Typography>

                  {/* min & max */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h5> الصغري: {temp.min}</h5>
                    <h5 style={{margin: '0 10px'}}>|</h5>
                    <h5> الكبري: {temp.max}</h5>
                  </div>
                  {/*==== min & max ===*/}

                </div>
                {/*====== degree & description =====*/}

                <CloudIcon style={{ fontSize: '200px', color: '#fff' }} />
              </div>
            </div>
            {/* ==== content */}
          </div>
          {/* ==== card ==== */}

          <div dir='rtl' style={{display: 'flex', justifyContent: 'end', width: '100%', marginTop: '20px'}}>
            <Button variant="text" style={{color: 'white'}}>انجليزي</Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App
