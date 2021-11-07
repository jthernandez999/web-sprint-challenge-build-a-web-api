// add middlewares here related to projects
const Projects = require('./projects-model')

// function validateProject(req, res, next) {
//     Projects.get(req.params.id)
//     const { name, description } = req.body
//     if(!name || !description) {
//         res.status(400).json({
//             message: 'missing required fields'
//         })
//     } else {
//         req.body = { name, description }
//         next()
//     }
// }

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (name || description || completed)  {
        next()
    } else {
        next({ status:400, message: 'body is missing name or description'})
    }
}


module.exports = {
    validateProject,
}