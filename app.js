const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    session = require('express-session'),
    upload = require('express-fileupload'),
    port = process.env.PORT || 3000,
    ip = process.env.IP,
    expressValidator = require('express-validator'),
    routes = require('./routes/index'),
    admin = require('./routes/admin')

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(upload())
app.use(expressValidator())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use('/', routes)
app.use('/admin', admin)


app.listen(port, ip, () => console.log(`Up on port ${port}...`))