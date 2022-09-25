// Import
const express = require('express')
const { createPool } = require('mariadb')
const route = express.Router()

//
const table = process.env.DB_TABLE
const col1 = process.env.DB_COL_STRING
const col2 = process.env.DB_COL_INT

// Create
route.get('/create', (req, res) => {
    res.render('crud/create.ejs', { col1: col1, col2: col2 })
})

route.post('/create', async (req, res) => {
    //
    let form = req.body

    //
    var pool = require('../modules/mariadb')
    let conn

    try {
        //
        conn = await pool.getConnection()
        //
        await conn.query('INSERT INTO ' + table + '(' + col1 + ', ' + col2 + ') VALUES (?, ?)', [form['col1'], form['col2']])
    } catch (e) {
        console.log('erro: ' + e)
    } finally {
        if (conn) conn.end()
    }

    //
    res.redirect('/')
})

// Read
route.get('/read', async (req, res) => {
    //
    let pool = require('../modules/mariadb')
    let conn

    //
    try {
        //
        conn = await pool.getConnection()

        //
        var db_read = await conn.query('SELECT * FROM ' + table)
        delete db_read.meta
    } catch (e) {
        console.log('erro: ' + e)
    } finally {
        if (conn) conn.end()
    }

    //
    res.render('crud/read.ejs', { query: db_read, col1: col1, col2: col2 })
})

// Update
route.get('/update', (req, res) => {
    res.render('crud/update.ejs', { col1: process.env.DB_COL_STRING, col2: process.env.DB_COL_INT })
})

route.post('/update', async (req, res) => {
    //
    let form = req.body

    //
    let pool = require('../modules/mariadb')
    let conn

    //
    try {
        //
        conn = await pool.getConnection()

        //
        var db_update = await conn.query('UPDATE ' + table + ' SET ' + col1 + '= (?), ' + col2 + '=(?) WHERE id = (?)', [form['col1'], form['col2'], form['id']])
        console.log(db_update)
    } catch (e) {
        console.log('erro: ' + e)
        res.redirect('/crud/update')
        return
    } finally {
        if (conn) conn.end()
    }

    //
    res.redirect('/')
})


// Delete
route.get('/delete', (req, res) => {
    res.render('crud/delete.ejs', { crud: 'Delete' })
})

route.post('/delete', async (req, res) => {
    //
    let form = req.body

    //
    let pool = require('../modules/mariadb')
    let conn

    //
    try {
        //
        conn = await pool.getConnection()
        var db_delete = await conn.query('DELETE FROM '+table+' WHERE id = (?)', [form['id']])
    } catch (e) {
        console.log('erro: '+e)
        return
    } finally {
        if (conn) conn.end()
    }

    res.redirect('/')
})

//
module.exports = route