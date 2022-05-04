const logger = require('./utils/logger');
const path = require('path');
const seekModule = require('./utils/FileSeeker');
const yargs = require("yargs");
const http = require('http');
const fs = require('fs');
const express = require('express');
const homeRouter = require('./api/home/controller')

//logger.info("Это сообщение будет зеленым цветом")
//logger.warn("Это сообщение будет желтым цветом")
//logger.error("Это сообщение будет красным цветом")
const argv = yargs(process.argv).argv;
const verbose = seekModule.verbose;
const app = express();

seekModule.myEmitter.on('fall', () => {
    const mes = 'File not found'
    logger.error(mes);
    if (argv.verbose) {
        verbose(mes, 'fall')
    }
});

seekModule.myEmitter.on('success', (arg1) => {
    const mes = 'File found ' + arg1
    logger.info(mes);
    if (argv.verbose) {
        verbose(mes, 'success')
    }
});

seekModule.seek(argv.file, path.dirname(process.argv[1]));


app.use('/', homeRouter);

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});
