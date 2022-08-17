import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

const del = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res);
};

const personsService = { getAll, create, del };

export default personsService;
