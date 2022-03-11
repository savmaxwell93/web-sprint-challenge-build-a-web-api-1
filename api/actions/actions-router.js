const express = require('express');

const router = express.Router();

const {
    validateAction,
    validateActionId
} = require('./actions-middleware')
const Action = require('./actions-model');

router.get('/', async (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})
router.get('/:id', validateActionId, (req, res, next) => {
    console.log('get individual action by id')
})
router.post('/', validateAction, (req, res, next) => {
    console.log('create new action')
})
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    console.log('update action by id')
})
router.delete('/:id', validateActionId, (req, res, next) => {
    console.log('delete action by id')
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'something broke inside projects-router',
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router;