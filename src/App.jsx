import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/min/locales';
import 'moment/locale/ar';
// reducer import
import { useSelector, useDispatch } from 'react-redux';
import { changeResult } from './weatherApiSlice';

moment.locale("ar"); 

const theme = createTheme({
  typography: {
    fontFamily: 'IBM'
  }
})

let cancelAxios = null;

function App() {
  // redux code 
  const result = useSelector((state) => {
    console.log("state is ", state);
    return state.result;
  });
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState('');
  const [temp, setTemp] = useState({
    number: null,
    description: '',
    min: null,
    max: null,
    icon: null,
  });

  const [locale , setLocale] = useState('ar');
  // EVent Handlers
  function handelLanguageClick() {
    if(i18n.language === 'ar') {
      i18n.changeLanguage('en');
      moment.locale("en");
      setLocale('en');
    } else {
      i18n.changeLanguage('ar');
      moment.locale("ar");
      setLocale('ar');
    }
    setDateAndTime(moment().format('LLL'));
  }

  useEffect(() => {
    // tring redux
    dispatch(changeResult());
    i18n.changeLanguage('ar');
  }, [])

  useEffect(() => {
    setDateAndTime(moment().format('LLL'));
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
        //console.log(response);
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
          <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{
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
              <div dir={locale === 'ar' ? 'rtl' : 'ltr'} 
                style={{
                  display: 'flex', 
                  justifyContent: 'start', 
                  alignItems: 'end',
                }}
              >
              <Typography variant="h2" 
                style={{marginRight: '15px', fontWeight: 'bold'}}
              >
                {t('Cairo')}
              </Typography>

              <Typography variant="h5" style={{marginRight: '15px'}}>
                {/* {dateAndTime} */}
                {t("Today")}
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
                      {t(temp.number)}
                    </Typography>

                    {/* TODO temp image */}
                    <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt="icon for sky" />
                  </div>
                  {/*==== tempreture ====*/}

                  <Typography variant="h6" 
                      style={{textAlign: 'right'}}
                  >
                    {t(temp.description)}
                  </Typography>

                  {/* min & max */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h5> {t('min')}: {t(temp.min)}</h5>
                    <h5 style={{margin: '0 10px'}}>|</h5>
                    <h5> {t('max')}: {t(temp.max)}</h5>
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

          <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{display: 'flex', justifyContent: 'end', width: '100%', marginTop: '20px'}}>
            <Button variant="text" style={{color: 'white'}}
              onClick={handelLanguageClick}>
              { locale === 'ar' ? 'انجليزي' : 'Arabic' }
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default App
