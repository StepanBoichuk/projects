const loggerModule = require('./utils/logger')


const info = loggerModule.info
const warn = loggerModule.warn
const error = loggerModule.error

info('Node.js', "4.5.0")
warn(";", "88")
error('МегаНагибатор', true)