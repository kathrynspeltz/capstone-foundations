require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed, getParks } = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)


// Parks
//app.post('/parks', createParks)
app.get('/parks', getParks)
//app.delete('/parks/:id', deleteParks)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))