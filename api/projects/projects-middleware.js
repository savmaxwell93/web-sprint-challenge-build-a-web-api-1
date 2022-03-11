const Project = require('./projects-model');
const { projectSchema } = require('../schemas/index');

function validateProjectId (req, res, next) {
    Project.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: `Could not find project with id ${req.params.id}`})
            } else {
                req.project = project;
                next()
            }
        })
        .catch(next)
}

async function validateProject (req, res, next) {
    try {
        const validated = await projectSchema.validate(req.body);
            req.body = validated;
            next();
    } catch (err) {
        res.status(400).json({
            message: "Must provide name, description and completed status"
        })
    }
}

module.exports = {
    validateProjectId,
    validateProject
}