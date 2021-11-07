const express = require('express');
const server = express();

const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


const actionsRouter = require('../api/actions/actions-router')
const projectsRouter = require('../api/projects/projects-router')

server.use(helmet())
server.use(cors())
// server.use(morgan('dev'))
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)


server.get('/', (req, res) => {
    res.status(200).json({
        status: 200, 
        message: 'This API is running!!', 
        time: new Date().toLocaleTimeString(),
    })
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
