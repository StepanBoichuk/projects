const EventEmitter = require('events');
const fs = require('fs')
const path = require ('path')

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

module.exports = {seek, myEmitter}