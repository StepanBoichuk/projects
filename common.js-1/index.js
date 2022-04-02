const logger = require('./utils/logger')
const path = require('path')
const seekModule = require('./utils/FileSeeker')
const yargs = require("yargs")
const http = require('http')
const fs = require('fs')

//logger.info("Это сообщение будет зеленым цветом")
//logger.warn("Это сообщение будет желтым цветом")
//logger.error("Это сообщение будет красным цветом")
const argv = yargs(process.argv).argv
const verbose = seekModule.verbose
const PORT = 3000;
const server = http.createServer();

seekModule.myEmitter.on('fall', () => {
    const mes = 'File not found'
    logger.error(mes);
    if (argv.verbose) {
        verbose(mes, 'fall')
    }
})

seekModule.myEmitter.on('success', (arg1) => {
    const mes = 'File found ' + arg1
    logger.info(mes);
    if (argv.verbose) {
        verbose(mes, 'success')
    }
});

seekModule.seek(argv.file, path.dirname(process.argv[1]))

server.on('request', (req, res) => {
    if (req.url == '/'){
        fs.createReadStream('index.html').pipe(res);
    }else if (req.url == '/favicon.ico'){
        fs.createReadStream('./favicon.ico').pipe(res)
    }else{
        res.destroy()
    }
    verbose('requested', req.url)
})


server.listen(PORT, () => {
    console.log(`Server is listening localhost:${PORT}`)
});