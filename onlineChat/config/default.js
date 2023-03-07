module.exports = {
    server: {
        host: 'localhost',
        port: 3000
    },
    sessionSecret: 'asdkasjfka',
    db: {
        connectionString: 'mongodb://db:27017/onlineChat'
    },
    redis: {
        host: 'localhost',
        port: 6379,
        password: 'secret'
    }
}