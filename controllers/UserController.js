const UserService = require('../services/UserService')
const userConstraint = require('../constraints/UserConstraint')
const validate = require('validate.js')

class UserController {
    async createUser(req,res) {
        const validation = validate(req.body, userConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const user = await UserService.create(req.body)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkCreateUser(req,res) {
        try {
            const users = await UserService.bulkCreate(req.body)
            res.status(201).json(users)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async getAllUsers(req,res) {
        try {
            const users = await UserService.getAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getByIdUser(req,res) {
        try {
            const user = await UserService.getById(req.param.id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async updateUser(req,res) {
        const validation = validate(req.body, userConstraint)
        if (validation) {
            return res.status(400).json({ errors: validation})
        }
        try {
            const user = await UserService.update(req.params.id, req.body)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async bulkUpdateUsers(req,res) {
        try {
            const users = await UserService.updateBulk(req.body)
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
    async deleteUser(req,res) {
        try {
            await UserService.delete(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

module.exports = new UserController()