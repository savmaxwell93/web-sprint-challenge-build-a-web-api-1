const express = require('express');

const router = express.Router();

const { validateProjectId, validateProject } = require('./projects-middleware');
const Project = require('./projects-model');

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
    console.log('get individual project by id')
})

router.post('/', (req, res, next) => {
    console.log('create new project')
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    console.log('update project by id')
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    console.log('delete project by id')
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
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