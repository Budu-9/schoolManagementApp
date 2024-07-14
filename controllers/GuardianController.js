const GuardianService = require('../services/GuardianService')
const guardianConstraint = require('../constraints/GuardianConstraint')
const validate = require('validate.js')

class GuardianController {
    async createGuardian(req,res) {
        const validation = validate(req.body, guardianConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const guardian = await GuardianService.create(req.body)
            res.status(201).json(guardian)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkCreateGuardian(req,res) {
        try {
            const guardians = await GuardianService.bulkCreate(req.body)
            res.status(201).json(guardians)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async getAllGuardians(req,res) {
        try {
            const guardians = await GuardianService.getAll()
            res.status(200).json(guardians)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getByIdGuardian(req,res) {
        try {
            const guardian = await GuardianService.getById(req.params.id)
            if (!guardian) {
                return res.status(404).json({ error: 'Guardian not found'})
            }
            res.status(200).json(guardian)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateGuardian(req,res) {
        const validation = validate(req.body, guardianConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const guardian = await GuardianService.update(req.params.id, req.body)
            res.status(200).json(guardian)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkUpdateGuardians(req,res) {
        try {
            const guardians = await GuardianService.updateBulk(req.body)
            res.status(200).json(guardians)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async deleteGuardian(req,res) {
        try {
            await GuardianService.delete(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

module.exports = new GuardianController()