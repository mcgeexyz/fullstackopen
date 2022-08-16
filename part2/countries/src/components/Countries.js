const Country = ({ country, showDetails }) => {
  const { name, capital, area, languages } = country;

  return showDetails ? (
    <div>
      <h2>{name.common}</h2>
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
    </div>
  ) : (
    <li>{name.common}</li>
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
