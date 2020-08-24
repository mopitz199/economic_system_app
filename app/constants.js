const server = 'https://eb.economicapp.io';
//const server = 'http://localhost:9000';

const token = localStorage.getItem('token')

let headers = {
  'Content-Type': 'application/json',
};

if(token){
  headers['Authorization'] = `Token ${token}`
}

export { server, headers };
