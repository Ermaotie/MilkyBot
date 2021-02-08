const express        = require('express');
const bodyParser     = require('body-parser');
const conf           = require('./config/config')
const app            = express();


const port = process.env.PORT || 8443;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


require('./app/routes')(app,conf);
app.listen(port, () => {
console.log('Listening at :' + port);
});

