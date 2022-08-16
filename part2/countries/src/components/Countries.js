import { useEffect, useState } from 'react';
import axios from 'axios';

const CountryListItem = ({ country, handleToggleDetails }) => {
  return (
    <li>
      <button
        style={{ width: 50 }}
        onClick={handleToggleDetails}
      >
        Show
      </button>{' '}
      {country.name.common}
    </li>
  );
};

const CountryDetailed = ({ country, handleToggleDetails }) => {
  const { name, capital, area, languages, flags } = country;

  const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `${API_BASE_URL}?key=${API_KEY}&q=${capital}&aqi=no`;

  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setWeather(response.data);
    });
  }, [API_URL]);

  return (
    <li>
      <button
        style={{ width: 50 }}
        onClick={handleToggleDetails}
      >
        Hide
      </button>
      <h2>{name.common}</h2>
      <p>Capital City: {capital}</p>
      <p>Area: {area} km2</p>
      <h4>Languages Spoken:</h4>
      <ul>
        {Object.entries(languages).map(([code, lang]) => {
          return <li key={code}>{lang}</li>;
        })}
      </ul>
      <img
        src={flags.png}
        alt={`${name.common} flag`}
      />
      <h3>Weather in {capital}</h3>
      {weather ? (
        <div>
          <p>Temperature: {weather.current.temp_c} Celcius</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>Wind: {weather.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>Loading Weather...</p>
      )}
    </li>
  );
};

const Country = ({ country, showDetails }) => {
  const [show, setShow] = useState(showDetails);

  const handleToggleDetails = () => {
    setShow((prevState) => !prevState);
  };

  return show ? (
    <CountryDetailed
      country={country}
      handleToggleDetails={handleToggleDetails}
    />
  ) : (
    <CountryListItem
      country={country}
      handleToggleDetails={handleToggleDetails}
    />
  );
};

const Countries = ({ countries, searchTerm }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayResults = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Try a more specific search term.</p>;
    }

    if (filteredCountries.length === 1) {
      return (
        <Country
          country={filteredCountries[0]}
          showDetails={true}
        />
      );
    }

    if (filteredCountries.length === 0) {
      return <p>No results found. Try a different search term.</p>;
    }

    return (
      <ol>
        {filteredCountries.map((country) => (
          <Country
            key={country.cca2}
            country={country}
            showDetails={false}
          />
        ))}
      </ol>
    );
  };

  return <div>{displayResults()}</div>;
};

export default Countries;
