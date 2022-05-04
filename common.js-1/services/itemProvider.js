const fs = require('fs');

async function getData(filePath) {
    return new Promise((res, rej) => {
        const file = fs.createReadStream(filePath, {encoding: 'utf-8'});
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

async function setData(filePath, data) {
    const temp = await getData(filePath);
    temp.push(data);
    const file$ = fs.createWriteStream(filePath, {encoding: 'utf-8'});
    file$.end(JSON.stringify(temp));
};

module.exports = {getData, setData};