const BaseService = require('./BaseService')
const { Teacher } = require('../models')

class TeacherService extends BaseService {
    constructor() {
        super(Teacher)
    }
}

module.exports = TeacherService