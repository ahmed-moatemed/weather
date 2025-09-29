import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async() => {
  const response =  await axios
    .get(
      'https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=e74d76f86bacc61e288f8127b8ff2cd0',
      // {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelAxios = c;
      //   })
      // }
    )

    // handle success
    const responseTemp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    console.log(response);
})
const weatherApiSlice = createSlice({
  name: 'weatherApi',

  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },

  reducers: {
    changeResult: (state, action) => {
      state.result = "change"
    },
  },

  extraReducers(builder){
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.isLoading = true;
    }).addCase(fetchWeather.fulfilled, (state,action) => {
      state.isLoading = false;
    }).addCase(fetchWeather.rejected, (state, action) => {
      state.isLoading = false;
    })
  }
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;