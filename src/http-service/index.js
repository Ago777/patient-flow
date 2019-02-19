import axios from 'axios';
import currentHost from "../configs";

const Http = {
    getToken: () => localStorage.getItem('userToken'),

    get: (url) => {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'token': Http.getToken() || ''
            };
            const apiHost = url ? currentHost() + url : currentHost();
            axios.get(apiHost, {headers})
              .then(response => resolve(response))
              .catch((err) => reject(err));
        });
    },

    post: (url, body) => {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json',
                'token': Http.getToken() || ''
            };
            const apiHost = url ? currentHost() + url : currentHost();
            axios({
                url: apiHost,
                method: 'post',
                data: JSON.stringify(body),
                headers,
            }).then(response => resolve(response))
              .catch(err => {
                  reject(err);
              });
        })
    },

    auth: (url, body) => {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json',
            };
            const apiHost = url ? currentHost() + url : currentHost();
            axios({
                url: apiHost,
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
