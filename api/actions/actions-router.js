// Write your "actions" router here!
const router = require('express').Router();

const { validateId,
        validateActionBody, 
} = require('../actions/actions-middlware')


const Actions = require('../actions/actions-model')

router.get('/', (req, res, next) => {
    Actions.get() 
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    console.log(req.action)
    res.status(200).json(req.action)
})

router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.json(req.action)
    })
    .catch(next)
})

router.post('/', validateActionBody, validateId, (req, res, next) => {
    // const action = req.body 
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(updated  => {
        res.status(200).json(updated)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something terribly wrong inside actions router happened', 
        message: err.message, 
        stack: err.stack
    })
})


module.exports = router
