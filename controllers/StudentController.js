const StudentService = require('../services/StudentService')
const studentConstraint = require('../constraints/studentConstraint')
const validate = require('validate.js')

class StudentController {
    async createStudent(req,res) {
        const validation = validate(req.body, studentConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const student = await StudentService.create(req.body)
            res.status(201).json(student)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkCreateStudent(req,res) {
        try {
            const students = await StudentService.bulkCreate(req.body)
            res.status(201).json(students)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async getAllStudents(req,res) {
        try {
            const students = await StudentService.getAll()
            res.status(200).json(students)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getByIdStudent(req,res) {
        try {
            const student = await StudentService.getById(req.params.id)
            if (!student) {
                return res.status(404).json({ error: 'Student not found'})
            }
            res.status(200).json(student)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateStudent(req,res) {
        const validation = validate(req.body, studentConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const student = await StudentService.update(req.params.id, req.body)
            res.status(200).json(student)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkUpdateStudent(req,res) {
        try {
            const students = await StudentService.updateBulk(req.body)
            res.status(200).json(students)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async deleteStudent(req,res) {
        try {
            await StudentService.delete(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

module.exports = new StudentController()