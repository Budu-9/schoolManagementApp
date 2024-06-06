const BaseService = require('./BaseService')
const { Student } = require('../models')

class StudentService extends BaseService {
    constructor() {
        super(Student)
    }
}
module.exports = new StudentService()