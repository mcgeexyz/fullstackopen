import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to the phone book`);
    } else {
      setPersons([...persons, { name: newName }]);
      setNewName('');
    }
  };

  console.log(persons);

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
};

export default App;
