// add middlewares here related to actions
const Action = require('./actions-model')

async function validateId(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'not found'
            })
        } else {
            // req.id = action
            req.action = action
            next()
        }
    } catch (err){
        next(err)
        // res.status(500).json({
        //     message: 'problem finding project with that id'
        // })
    }
}

function validateActionBody(req, res, next) {
    const { project_id, description, notes } =  req.body
        if(!project_id || !description || !notes) {
            res.status(400).json({
                message: 'missing required text field'
            })
        } else {
            console.log('from validateActionBody', req.body)
            req.action = { project_id, description, notes }
            console.log(req.action)
            next()
        }
}

module.exports = {
    validateId,
    validateActionBody,
}