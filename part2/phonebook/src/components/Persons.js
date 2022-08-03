const Person = ({ person: { name, number, id } }) => (
  <li>
    {id}. {name}: {number}
  </li>
);

const Persons = ({ persons, filter }) => {
  const personsToShow = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <Person
        key={person.id}
        person={person}
      />
    ));

  return <ul>{personsToShow}</ul>;
};

export default Persons;
