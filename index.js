const express = require('express')
const db = require('./data/db')

const base = '/api/users'
const app = express()

app.use(express.json())

app.get(`${base}`, (req, res) => {
    db.find().then(dbres => {
        res.status(200).json(dbres)
    }).catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

app.get(`${base}/:id`, (req, res) => {
    const {id} = req.params
    console.log(id)

    db.findById(id).then(dbres => {
        if(!dbres) res.status(404).json({ message: "The user with the specified ID does not exist." }) 

        res.json(dbres)
    }).catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
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