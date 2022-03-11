const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('get projects array')
})
router.get('/:id', (req, res, next) => {
    console.log('get individual project by id')
})
router.post('/', (req, res, next) => {
    console.log('create new project')
})
router.put('/:id', (req, res, next) => {
    console.log('update project by id')
})
router.delete('/:id', (req, res, next) => {
    console.log('delete project by id')
})
router.get('/:id/actions', (req, res, next) => {
    console.log('get all actions by id')
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Something broke inside the projects-router",
        message: err.message,
        stack: err.stack
    })
})


module.exports = router;