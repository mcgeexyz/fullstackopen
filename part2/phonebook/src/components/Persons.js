const Person = ({ person: { name, number, id }, handleDelete }) => (
  <li>
    {id}. {name}: {number}
    <button onClick={handleDelete}>Delete</button>
  </li>
);

const Persons = ({ persons, filter, handleDelete }) => {
  const personsToShow = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <Person
        key={person.id}
        person={person}
        handleDelete={() => handleDelete(person.id)}
      />
    ));

  return <ul>{personsToShow}</ul>;
};

export default Persons;
