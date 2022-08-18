import { useState, useEffect } from 'react';
import personsService from './services/persons';
import './index.css';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const newPersonInitialState = {
    id: '',
    name: '',
    number: '',
  };
  const [newPerson, setNewPerson] = useState(newPersonInitialState);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: '' });

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const notify = (message, type, timeout = 3000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, timeout);
  };

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

    const alreadyExists = persons.find(
      (person) => person.name === newPerson.name
    );

    if (alreadyExists) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phone book, replace the old number with the new one?`
      );

      if (confirmUpdate) {
        personsService
          .update(alreadyExists.id, newPerson)
          .then((returnedPerson) => {
            setPersons((prevState) => {
              return prevState.map((person) => {
                return person.id === alreadyExists.id ? returnedPerson : person;
              });
            });
            notify(`Updated ${returnedPerson.name}`, 'success');
          })
          .catch((err) => {
            alert('There was a problem updating the phone number...');
          });
      }
    } else {
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons((prevState) => [...prevState, returnedPerson]);
          notify(`Added ${returnedPerson.name}`, 'success');
        })
        .catch((err) => {
          alert('There was a problem adding the new phone number...');
        });

      setNewPerson(newPersonInitialState);
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const deleteConfirmed = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (deleteConfirmed) {
      personsService
        .del(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          notify(`Deleted ${personToDelete.name}.`, 'error');
        })
        .catch((err) => {
          alert(`Error deleting ${personToDelete.name}...`, err);
        });
    }
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <Notification notification={notification} />
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
