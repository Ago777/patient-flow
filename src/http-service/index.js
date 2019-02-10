import axios from 'axios';

const Http = {
    getToken: () => localStorage.getItem('userToken'),

    get: (url) => {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'token': Http.getToken() || ''
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
                'token': Http.getToken() || ''
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

    auth: (url, body) => {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json',
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
