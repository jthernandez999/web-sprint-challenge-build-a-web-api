// add middlewares here related to projects
const Projects = require('./projects-model')

function validateId(req, res, next) {
    Projects.get(req.params.id) 
        .then(possibleId => {
            if(possibleId) {
                req.possibleId = possibleId
                next()
            } else {
                next({
                    status: 404, 
                    message: 'there is no project with the given id'
                })
            }
        })
        .catch(next)
}

// async function validateId(req, res, next) {
//     try{
//         const project = await Projects.get(req.params.id) 
//         if(!project) {
//             res.status(404).json({
//                 message: 'there is no project with the given id'
//             })
//         } else {
//             req.project = project
//             next()
//         }
//     } catch(err) {
//         next(err)
//     }
        
// }

function validateProject(req, res, next) {
    const { name, description, completed } = req.body 
    if( name && description || completed) {
        next()
    } else {
        next({
            status: 400, 
            message: 'body is missing name, description'
        })
    }
}


// function validateProject(req, res, next) {
//     const { name, description, completed } = req.body
//     if (!name || !description || !completed) {
//         res.status(400).json({
//             message: 'body is missing name or description'
//         })
//     } else {
//         req.body = { name, description, completed }
//         next()
//     }
// }


module.exports = {
    validateProject,
    validateId,
}