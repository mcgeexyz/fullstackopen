const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="filter">Filter</label>
    <input
      id="filter"
      name="filter"
      value={filter}
      onChange={handleFilterChange}
    />
  </div>
);

export default Filter;
