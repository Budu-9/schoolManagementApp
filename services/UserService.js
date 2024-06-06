const BaseService = require('./BaseService')
const { User } = require('../models')

class UserService extends BaseService {
    constructor () {
        super(User)
    }
}

module.exports = new UserService()