import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/feather/search'
import { WeatherViewer } from './WeatherViewer'


export const Dashboard = () => {
    // states
    const [citySearch, setCitySearch] = useState('');
    const [cityData, setCityData]=useState(null);
  
    // city search form
    const fetchCity = (e) =>{
      e.preventDefault();
      axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=${citySearch}`)
      .then((res)=>{
        setCityData(res.data[0]);
        setCitySearch('');
      }).catch(err=>console.log(err.message));
    }

    const handleLogout = async e => {
      e.preventDefault();
      sessionStorage.removeItem("token");
      window.location.href = '/';
    }

  return(
    <div className="wrapper">
      <button onClick={handleLogout}>Log out</button>
      <h1 className="headline">Welcome!</h1>
      <form className='form-group custom-form' autoComplete='off'
      onSubmit={fetchCity}>
        <label>Search for a city to get weather data</label>
        <div className='search-box'>
          <input className='form-control' required placeholder='Enter city name...'
          value={citySearch} onChange={(e)=>setCitySearch(e.target.value)}/>
          <button type='submit' className="btn btn-secondary btn-sm">
            <Icon icon={search} size={22}/>
          </button>
        </div>
      </form>
      {cityData&& <div style={{padding:10+'px', width: 100+'%'}}><WeatherViewer cityData={cityData}/></div>}
    </div>
  );
}