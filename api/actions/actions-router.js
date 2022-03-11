const express = require('express');

const router = express.Router();

const {
    validateAction,
    validateActionId
} = require('./actions-middleware')
const Action = require('./actions-model');

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'something broke inside actions-router',
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;