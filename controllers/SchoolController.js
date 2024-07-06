const SchoolService = require('../services/SchoolService')
const schoolConstraint = require('../constraints/schoolConstraint')
const validate = require('validate.js') 

class SchoolController {
    async createSchool(req,res) {
        const validation = validate(req.body, schoolConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const school = await SchoolService.create(req.body)
            res.status(201).json(school)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkCreateSchool(req,res) {
        try {
            const schools = await SchoolService.bulkCreate(req.body)
            res.status(201).json(schools)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async getAllSchools(req,res) {
        try {
            const schools = await SchoolService.getAll()
            res.status(200).json(schools)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getByIdSchool(req,res) {
        try {
            const school = await SchoolService.getById(req.params.id)
            if (!school) {
                return res.status(404).json({ error: 'School not found'})
            }
            res.status(200).json(school)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateSchool(req,res) {
        const validation = validate(req.body, schoolConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const school = await SchoolService.update(req.params.id, req.body)
            res.status(200).json(school)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkUpdateSchools(req,res) {
        try {
            const schools = await SchoolService.updateBulk(req.body)
            res.status(200).json(schools)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async deleteSchool(req,res) {
        try {
            await SchoolService.delete(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

module.exports = new SchoolController()