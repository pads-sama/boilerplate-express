require('dotenv').config();
const bodyParser = require('body-parser');
const { populate } = require('dotenv');
let express = require('express');
let app = express();
let path = require('path');

console.log("Hello World");

//serve public folders
app.use('/public', express.static(path.join(__dirname, '/public')));

//logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

//body parser extended = false
app.use(bodyParser.urlencoded({ extended: false }));

//display the index.html from views folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//return json data
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

//return the time of request
const currentTime = () => new Date().toString();

app.get('/now', (req, res, next) => {
    req.time = currentTime();
    next();
}, (req, res) => {
    res.json({ "time": req.time });
});


//display the echod word
app.get('/:word/echo', (req, res) => {
    const echoWord = req.params.word;
    res.json({ "echo": echoWord });
});


//req.query
app.route('/name').get((req, res) => {
    res.json({ "name": `${req.query.first} ${req.query.last}` });
}).post((req, res) => {
    //return the data from the form
    res.json({ "name": `${req.body.first} ${req.body.last}` });
});

































module.exports = app;
