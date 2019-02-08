import axios from 'axios';

const Http = {
  getToken: () => localStorage.getItem('token'),

  get: (url) => {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': Http.getToken() || ''
      };
      axios.get(url, {headers})
         .then(response => resolve(response))
         .catch((err) => reject(err));
    });
  },


  post: (url, body) => {
    return new Promise((resolve, reject) => {
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': Http.getToken() || ''
      };
      axios({
        url,
        method: 'post',
        data: JSON.stringify(body),
        headers,
      }).then(response => resolve(response))
         .catch(err => {
           reject(err);
         });
    })
  },
};

export default Http;
