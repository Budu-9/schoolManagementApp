const BaseService = require('./BaseService')
const { Guardian } = require('../models')

class GuardianService extends BaseService {
    constructor() {
        super(Guardian)
    }
}

module.exports = GuardianService