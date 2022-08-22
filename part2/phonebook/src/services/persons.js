import axios from 'axios';

const baseURL = 'https://mcgee-phonebook-backend.herokuapp.com/api/persons';

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject).then((res) => res.data);
};

const del = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res.status);
};

const personsService = { getAll, create, update, del };

export default personsService;
