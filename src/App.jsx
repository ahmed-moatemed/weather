import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button'

const theme = createTheme({
  typography: {
    fontFamily: 'IBM'
  }
})

function App() {
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
                  <div>
                    <Typography variant="h1" 
                      style={{textAlign: 'right'}}
                    >
                      24
                    </Typography>

                  {/* TODO temp image */}
                  </div>
                  {/*==== tempreture ====*/}

                  <Typography variant="h6" 
                      style={{textAlign: 'right'}}
                  >
                    broken clouds
                  </Typography>

                  {/* min & max */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h5> الصغري: 34</h5>
                    <h5 style={{margin: '0 10px'}}>|</h5>
                    <h5> الكبري: 34</h5>
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
