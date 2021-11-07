// Write your "projects" router here!
const router = require('express').Router();
const Projects = require('./projects-model')

const { validateProject, validateId, } = require('./projects-middleware');
const { rawListeners } = require('superagent');

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: 'no project with given id'
                })
            } else {
                res.json(project)
            }
        })
        .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(next)
})


router.put('/:id', validateProject, validateId,(req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(project => {
        if(project){ 
            res.json(project)
        } else {
            res.status(404).json({ 
                message: 'here is no project with the given id'
            })
        }
    })
    .catch(next)
})

// router.put('/:id', validateProject, validateId,(req, res, next) => {
//     Projects.update(req.params.id, req.body)
//     .then(() => {
//         return Projects.get(req.params.id)
//     })
//     .then(project => {
//         res.json(project)
//     })
//     .catch(next)
// })


router.delete('/:id', async (req, res, next) =>{
    try {
        const toBeDeleted = await Projects.get(req.params.id)
        if(!toBeDeleted) {
            res.status(404).json({
                message: 'no project with given id'
            })
        } else {
            await Projects.remove(req.params.id)
        res.json()
        }
    } catch(err) {
        next(err)
    }
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(projects => {
        res.status(201).json(projects)
    })
    .catch(next)
})



router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something terribly wrong inside projects router happened', 
        message: err.message, 
        stack: err.stack
    })
})

module.exports = router 