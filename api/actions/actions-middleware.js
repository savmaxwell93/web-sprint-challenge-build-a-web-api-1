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

async function validateAction (req, res, next) {
    try {
        const validated = await actionSchema.validate(req.body);
            req.body = validated;
            next();
    } catch (err) {
        res.status(400).json({
            message: "Must provide notes, description and project_id"
        })
    }
}

module.exports = {
    validateActionId,
    validateAction
}