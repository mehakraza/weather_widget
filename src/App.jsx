import React, { Component } from 'react';
import { FormGroup,
        FormControl,
        InputGroup,
        Glyphicon } from 'react-bootstrap';
import WeatherCard from './WeatherCard';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cities: [],
    }
  }

  search(cityName) {
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
    const FETCH_URL = `${BASE_URL}q=${cityName}&appid=50a34e070dd5c09a99554b57ab7ea7e2`;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const cities = this.state.cities;
      cities.push({
        cityName:json.name,
        details:json.main,
        weather:json.weather[0]
      });
      this.setState({ cities, city: '' });
    });
  }

  deleteCity = (cityName) => {
    const cities = this.state.cities.filter((city) => (city.cityName !== cityName));
    this.setState({ cities });
  }

  render() {
    const weatherList = this.state.cities.map((city, index) => (
      <WeatherCard
        key={index}
        deleteCity={this.deleteCity}
        cityName={city.cityName}
        details={city.details}
        weather={city.weather}
      />
    ));
    return(
      <div className='App'>
        <h1 className='App-title'>Weather Widget</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search city..."
              value={this.state.city}
              onChange={event => {this.setState({city:event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search(this.state.city)
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search(this.state.city)}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {weatherList}
      </div>
    )
  }
}

export default App;
