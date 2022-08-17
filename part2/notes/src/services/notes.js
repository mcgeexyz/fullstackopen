import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  const req = axios.get(baseUrl);
  const nonExisting = {
    id: 99999,
    content: 'This not is not saved to the server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  };
  return req.then((res) => [...res.data, nonExisting]);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

const noteService = { getAll, create, update };

export default noteService;
