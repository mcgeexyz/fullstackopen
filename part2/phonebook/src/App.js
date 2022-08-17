import { useState, useEffect } from 'react';
import personsService from './services/persons';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const newPersonInitialState = {
    id: '',
    name: '',
    number: '',
  };
  const [newPerson, setNewPerson] = useState(newPersonInitialState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phone book`);
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons((prevState) => [...prevState, returnedPerson]);
        })
        .catch((err) => {
          alert('There was a problem adding the new phone number...');
        });

      setNewPerson(newPersonInitialState);
    }
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <PersonForm
        newPerson={newPerson}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Persons
        persons={persons}
        filter={filter}
      />
    </div>
  );
};

export default App;
