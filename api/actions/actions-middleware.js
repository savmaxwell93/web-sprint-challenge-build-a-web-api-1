const Action = require('./actions-model');
const { actionSchema } = require('../schemas/index');

function validateActionId (req, res, next) {
    Action.get(req.params.id)
        .then(action => {
            if (!action) {
                res.status(404).json({ message: `Could not find action with id ${req.params.id}`})
            } else {
                req.action = action;
                next()
            }
        })
        .catch(next)
}

function validateAction (req, res, next) {
    actionSchema.validate(req.body)
        .then(validated => {
            if (!validated) {
                res.status(400).json({ message: "Must provide notes, description and completion project_id"})
            } else {
                req.body = validated;
                next()
            }
        })
        .catch(next)
}

module.exports = {
    validateActionId,
    validateAction
}