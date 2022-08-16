import { useState } from 'react';

const Country = ({ country, showDetails }) => {
  const [show, setShow] = useState(showDetails);

  const { name, capital, area, languages } = country;

  const handleToggleDetails = () => {
    setShow((prevState) => !prevState);
  };

  return show ? (
    <li>
      <div>
        <button
          style={{ width: 50, marginRight: 4 }}
          onClick={handleToggleDetails}
        >
          Hide
        </button>
        {name.common}
      </div>
      <p>Capital City: {capital}</p>
      <p>Area: {area} km2</p>
      <p>Languages Spoken:</p>
      <ul>
        {Object.entries(languages).map(([code, lang]) => {
          return <li key={code}>{lang}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        alt={`${name.common} flag`}
      />
    </li>
  ) : (
    <li>
      <button
        style={{ width: 50 }}
        onClick={handleToggleDetails}
      >
        Show
      </button>{' '}
      {name.common}
    </li>
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
          show={true}
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
            show={false}
          />
        ))}
      </ol>
    );
  };

  return <div>{displayResults()}</div>;
};

export default Countries;
