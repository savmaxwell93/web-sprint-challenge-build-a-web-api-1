const yup = require('yup');

const projectSchema = yup.object({
    name: yup.string().trim().required(),
    description: yup.string().trim().required('Description is a required field'),
    completed: yup.boolean().required()
})

const actionSchema = yup.object({
    notes: yup.string().trim().required('Notes are a required field'),
    description: yup.string().trim().required('Description is a required field'),
    project_id: yup.number().required('Project id is a required field')
})

module.exports = {
    projectSchema,
    actionSchema
}