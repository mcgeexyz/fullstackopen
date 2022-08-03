import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '555-1234-5678' },
  ]);

  const newPersonDefaultState = { name: '', phoneNumber: '' };
  const [newPerson, setNewPerson] = useState(newPersonDefaultState);

  const handleInputChange = ({ target: { name, value } }) => {
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phone book`);
    } else {
      setPersons([...persons, newPerson]);
      setNewPerson(newPersonDefaultState);
    }
  };

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            name="name"
            value={newPerson.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          number:{' '}
          <input
            name="phoneNumber"
            value={newPerson.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, phoneNumber }) => (
        <p key={name}>
          {name}: {phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
