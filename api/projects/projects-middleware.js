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
    const { name, description } = req.body 
    if( !name || !description ) {
        next({
            status: 400, 
            message: 'body is missing name, description'
        })
    } else {
        next()
    }
}
function validateCompletedProject(req, res, next) {
    const { name, description, completed } = req.body 
    if(!name) { 
        next({
            status: 400, 
            message: 'body is missing name'
        })
    } else if (!description) {
        next({
            status: 400, 
            message: 'body is missing description'
        })
    }  
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}
// function validateCompletedProject(req, res, next) {
//     const { name, description, completed } = req.body 
//     if(!name) { 
//         next({
//             status: 400, 
//             message: 'body is missing name'
//         })
//     } else if (!description) {
//         next({
//             status: 400, 
//             message: 'body is missing description'
//         })
//     }  else if (!completed) {
//         next({
//             status: 400, 
//             message: 'body is missing completed'
//         })
//     } else {
//         req.name = name.trim()
//         req.description = description.trim()
//         req.completed = completed
//         next()
//     }
// }
// function validateCompletedProject(req, res, next) {
//     const { name, description, completed } = req.body 
//     if( !name && !description && !completed) {
//         next({
//             status: 400, 
//             message: 'body is missing name, description'
//         })
//     } else {
//         next()
//     }
// }

// function validateCompletedProject(req, res, next) {
//     const { name, description, completed } = req.body 
//     if( name && description && completed) {
//         req.body = { name, description, completed }
//         next()
//     } else {
//         res.status(400).json({
//             message: 'body is missing name, description, or completed'
//         })
//     }
// }




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
    validateCompletedProject,
}