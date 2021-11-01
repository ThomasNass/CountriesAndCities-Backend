var express = require('express');
var path = require('path');
const fs = require("fs");
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/country", (req, res) => {
    fs.readFile("country.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const country = JSON.parse(data);
        country.push(req.body);
        fs.writeFile("country.json", JSON.stringify(country, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json({ success: true });
    })
});

app.get("/country", (req, res) => {
    fs.readFile("country.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const country = JSON.parse(data);

        res.send(country);
    })
});

app.post("/city", (req, res) => {
    fs.readFile("city.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const city = JSON.parse(data);
        city.push(req.body);
        fs.writeFile("city.json", JSON.stringify(city, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json({ success: true });
    })
});

app.get("/city", (req, res) => {
    fs.readFile("city.json", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
            return;
        }

        const city = JSON.parse(data);

        res.send(city);
    })
});


app.listen(5000, () => console.log("Express app is running...."));

module.exports = app;
