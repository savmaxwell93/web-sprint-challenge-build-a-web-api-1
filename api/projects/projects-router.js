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

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        res.status(200).json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
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