import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const newPersonInitialState = {
    id: persons.length + 1,
    name: '',
    number: '',
  };
  const [newPerson, setNewPerson] = useState(newPersonInitialState);
  const [filter, setFilter] = useState('');

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
      setPersons([...persons, newPerson]);
      setNewPerson(newPersonInitialState);
    }
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h1>Phone Book</h1>
      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            name="name"
            value={newPerson.name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          number:{' '}
          <input
            name="number"
            value={newPerson.number}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        filter:{' '}
        <input
          name="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {personsToShow.map(({ id, name, number }) => (
        <p key={id}>
          {id}. {name}: {number}
        </p>
      ))}
    </div>
  );
};

export default App;
