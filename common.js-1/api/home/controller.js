const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const dataProvider = require('../../services/itemProvider')
const bodyParser = require('body-parser');

const homeRouter = Router();
const filePath = path.join('public', 'data', 'TODOlist.json');


homeRouter.get('/', (req, res) => {
    let temp = '';
    const home$ = fs.createReadStream(path.join(
        __dirname, '..', '..', 'public', 'views', 'index.html'
    ), {encoding: 'utf-8'});

    home$.on('data', data => {
        temp += data;
    });

    home$.on('end', () => {
        dataProvider.getData(filePath)
            .then(function(result) {
                const list = result.map(e => `<li>[${e.date}] ${e.value}</li>`).join('\n');
                temp = temp.replace('{{list}}', list);
                res.send(temp);
            })
    });
});


const urlencodeParser = bodyParser.urlencoded({ extended: true })

homeRouter.post('/', urlencodeParser, function (req, res) {    
        const template = {
            value: req.body.itemValue,
            date: new Date().toLocaleTimeString()
        };
        dataProvider.setData(filePath, template);
        res.redirect('/');
});



module.exports = homeRouter;