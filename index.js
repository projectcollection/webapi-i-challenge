const express = require('express')
const db = require('./data/db')

const base = '/api/users'
const app = express()

app.use(express.json())

app.get(`${base}`, (req, res) => {
    db.find().then(dbres => {
        console.log(dbres)
        res.status(200).json(dbres)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

app.get(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

app.post(`${base}`,(req, res) => {
    console.log(req.body)
})

app.put(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

app.delete(`${base}/:id`, (req, res) => {
    res.send('hello world')
})

const port = 5000

app.listen(port, () => console.log(`running on port ${port}`))