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

    db.findById(id).then(dbres => {
        if(!dbres) {
            res.status(404).json({ message: "The user with the specified ID does not exist." }) 
        }
        res.json(dbres)
    }).catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

app.post(`${base}`,(req, res) => {
    const {name, bio} = req.body
    console.log(name, bio)
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        return
    }
    db.insert(req.body).then(dbres => {
        res.status(201).json(dbres)
    }).catch(err => {
        res.send(500).json({ error: "There was an error while saving the user to the database" })
    })
})

app.put(`${base}/:id`, (req, res) => {
    const {name, bio} = req.body
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        return
    }

    db.update(req.params.id, req.body).then( async dbres => {
        await db.findById(req.params.id).then(user => {
            res.status(200).json(user)
        })
    }).catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

app.delete(`${base}/:id`, (req, res) => {
    db.remove(req.params.id).then(dbres => {
        console.log(dbres)
        if(dbres === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).end()
    }).catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
})

const port = 5000

app.listen(port, () => console.log(`running on port ${port}`))