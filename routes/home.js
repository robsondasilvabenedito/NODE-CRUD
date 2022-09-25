// Import
const express = require('express')
const route = express.Router()

//
route.get('/', (req, res) => {
    res.render('index.ejs')
})

//
module.exports = route