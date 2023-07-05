const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/todos', async(req, res) => {
    try {
        const {content} = req.body
        const todo = await pool.query('INSERT INTO todo (content) VALUES ($1) RETURNING *', [content])
        res.json(todo.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})

app.get('/todos', async(req, res) => {
    try {
        const todo = await pool.query('SELECT * FROM todo')
        res.json(todo.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/todos/:id', async(req, res) => {
    try {
        const id = req.params.id
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1', [id])
        res.json(todo.rows)
    } catch (error) {
       console.log(error.message) 
    }
})

app.put('/todos/:id', async(req, res) => {
    try {
        const id = req.params.id
        const {content} = req.body
        await pool.query('UPDATE todo SET content = $1 WHERE todo_id=$2', [content, id])
        res.json('Updated succefully')
    } catch (error) {
        console.log(error.message)
    }
})

app.delete('/todos/:id', async(req, res) => {
    try {
        const id = req.params.id
        await pool.query('DELETE FROM todo WHERE todo_id=$1', [id])
        res.json('Deleted succefully')
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(5000, () => {
    console.log('server running on port 5000')
})