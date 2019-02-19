const hosts = {
    dev: 'http://35.237.117.23:3002',
    prod: 'http://10.142.0.2:3002',
};

const currentHost = () => process.env.NODE_ENV === 'production' ? hosts.prod : hosts.dev;

export default  currentHost;