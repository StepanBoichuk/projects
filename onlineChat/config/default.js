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
    },
    auth: {
        google: {
            secret: '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',
            clientID: '1051385404394-5336vneohmrkfrgrm3gq7gd2475jjfmj.apps.googleusercontent.com',
            callbackURL: '/redirect/google'
        }
    }
}