import { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Countries App</h1>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <Countries
        countries={countries}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default App;
