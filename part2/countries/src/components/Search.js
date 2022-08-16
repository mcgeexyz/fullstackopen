const Search = ({ searchTerm, handleSearchTermChange }) => (
  <div>
    <label htmlFor="search">Search Countries: </label>
    <input
      type="search"
      id="searchTerm"
      name="searchTerm"
      value={searchTerm}
      onChange={handleSearchTermChange}
    />
  </div>
);

export default Search;
