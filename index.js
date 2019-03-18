const express = require('express')
const db = require('./data/db')

const base = '/api/users'
const app = express()

app.use(express.json())

app.get(`${base}`, (req, res) => {
    res.send('hello world')
})

app.get(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

app.post(`${base}`,(req, res) => {
    res.send('hello world')
})

app.put(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

app.delete(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

const port = 5000

app.listen(port, () => console.log(`running on port ${port}`))