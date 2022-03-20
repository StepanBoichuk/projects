const logger = require('./utils/logger')
const path = require('path')
const seekModule = require('./utils/FileSeeker')


//logger.info("Это сообщение будет зеленым цветом")
//logger.warn("Это сообщение будет желтым цветом")
//logger.error("Это сообщение будет красным цветом")

seekModule.myEmitter.on('fall', () => {
    logger.error('File not found')
})

seekModule.myEmitter.on('success', (arg1) => {
    logger.info('File found ' + arg1);
});


seekModule.seek(process.argv[2], path.dirname(process.argv[1]))
