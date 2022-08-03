const PersonForm = ({
  handleSubmit,
  handleFormChange,
  newPerson: { name, number },
}) => (
  <div>
    <h2>Add Person</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={handleFormChange}
      />
      <label htmlFor="number">Number</label>
      <input
        id="number"
        name="number"
        value={number}
        onChange={handleFormChange}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
);

export default PersonForm;
