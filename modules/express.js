// Import
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Set Ejs render
app.set('view engine', 'ejs')

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Bootstrap
app.use('/css', express.static('./node_modules/bootstrap/dist/css/bootstrap.min.css'))
app.use('/js', express.static('/node_modules/bootstrap/dist/js/bootstrap.min.js'))

//
const home = require('../routes/home')
const crud = require('../routes/crud')

//
app.use(home)
app.use('/crud', crud)

// Page not Found
app.use(function(req, res, next) {
    res.status(404)

    res.render('error.ejs', { page: req.url})
})

// Listen
app.listen(3000)