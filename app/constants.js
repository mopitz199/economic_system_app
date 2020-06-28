//const server = 'https://economicapp.io';
const server = 'http://localhost:9000';

const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${token}`
};

export { server, headers };
