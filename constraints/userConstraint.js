const validate = require('validate.js')

const userConstraints = {
    username: {
        presence: true,
        length: {
            minimum: 4,
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
    }
}

module.exports = userConstraints