import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

const personsService = { getAll, create };

export default personsService;
