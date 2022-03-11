const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('get actions array')
})
router.get('/:id', (req, res, next) => {
    console.log('get individual action by id')
})
router.post('/', (req, res, next) => {
    console.log('create new action')
})
router.put('/:id', (req, res, next) => {
    console.log('update action by id')
})
router.delete('/:id', (req, res, next) => {
    console.log('delete action by id')
})


module.exports = router;