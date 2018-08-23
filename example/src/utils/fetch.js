import axios from 'axios';

const fetch = data => axios({
  ...data,
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.data);

export default fetch;
