const EventEmitter = require('events');
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')

const argv = yargs(process.argv).argv
const myEmitter = new EventEmitter();

async function seek (target, dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err)
          console.log(err);
        else {
          if (files.indexOf(target) === -1){
              process.nextTick(() => {
                myEmitter.emit('fall')
              })
          }else{
              process.nextTick(() => {
                myEmitter.emit('success', path.join(dirPath, target))
              })
          }
        }
      })
};

const verbose = (data, eventName) => {
  if(argv.verbose){
      const res = `[${new Date().toLocaleTimeString()}][${eventName}] ${data} \n`
      fs.writeFile('./events.log', res, { flag: 'a+'}, err => {
        console.error(err)
   })
  }
}

module.exports = {seek, myEmitter, verbose}
