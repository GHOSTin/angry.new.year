const express = require('express');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');

let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');

const data = require(path.join(__dirname, 'data.json'));

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, '../build')));
app.use("/", express.static(path.join(__dirname, '../build/admin')));

app.use('/', indexRouter);
app.use('/v1/admin', adminRouter);
app.get('/data', (req, res)=>{
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});
app.post('/data', (req, res)=> {
  let selectData = req.body;
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data)=>{
    if(err) throw err;
    let dbData = JSON.parse(data);
    for (let value in dbData) {
      if(dbData[value].id === selectData.id) {
        dbData[value].disabled = selectData.disabled;
      }
    }
    const updateJSON = JSON.stringify(dbData);
    fs.writeFile(path.join(__dirname, 'data.json'), updateJSON, 'utf8', (err, data)=>{
      if(err) throw err;
      res.status(200).send(updateJSON);
    })
  })
});

module.exports = app;