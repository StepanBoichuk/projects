const fs = require('fs');
const path = require('path');


async function getDatabase() {
    return new Promise((res, rej) => {
        const file = fs.createReadStream(path.join(__dirname, '..', 'data', 'userdata.json'), {encoding: 'utf-8'});
        let temp = "";

        file.on('data', data => {
            temp += data;
        });

        file.on('end', () =>{
            res(JSON.parse(temp));
        });

        file.on('err', () => {
            rej(err);
        });
    });
};

module.exports = getDatabase;