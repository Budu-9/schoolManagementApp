const validate = require('validate.js')

const guardianConstraints = {
    username: {
        presence: true,
        length: {
            minimum: 3,
            maximum: 20
        }
    },
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 6
        }
    },
    userId: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    }
}

module.exports = guardianConstraints