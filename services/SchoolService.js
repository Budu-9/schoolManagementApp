const BaseService = require('./BaseService')
const { School } = require('../models')

class SchoolService extends BaseService {
    constructor() {
        super(School)
    }
}
module.exports = SchoolService