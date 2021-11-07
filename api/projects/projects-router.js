// Write your "projects" router here!
const router = require('express').Router();

router.get('/', (req, res) => {

})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something terribly wrong inside projects router happened', 
        message: err.message, 
        stack: err.stack
    })
})

module.exports = router 