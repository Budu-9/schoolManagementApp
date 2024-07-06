const TeacherService = require('../services/TeacherService')
const teacherConstraint = require('../constraints/teacherConstraint')
const validate = require('validate.js')

class TeacherController {
    async createTeacher(req,res) {
        const validation = validate(req.body, teacherConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const teacher = await TeacherService.create(req.body)
            res.status(201).json(teacher)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkCreateTeacher(req,res) {
        try {
            const teachers = await TeacherService.bulkCreate(req.body)
            res.status(201).json(teachers)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async getAllTeachers(req,res) {
        try {
            const teachers = await TeacherService.getAll() 
            res.status(200).json(teachers)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getByIdTeacher(req,res) {
        try {
            const teacher = await TeacherService.getById(req.params.id)
            if (!teacher) {
                return res.status(404).json({ error: 'Teacher not found'})
            }
            res.status(200).json(teacher)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateTeacher(req,res) {
        const validation = validate(req.body, teacherConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const teacher = await TeacherService.update(req.params.id, req.body)
            res.status(200).json(teacher)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkUpdateTeachers(req,res) {
        try {
            const teachers = await TeacherService.updateBulk(req.body)
            res.status(200).json(teachers)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async deleteTeacher(req,res) {
        try {
            await TeacherService.delete(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

module.exports = new TeacherController()