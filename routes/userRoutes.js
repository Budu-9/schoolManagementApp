const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/create', UserController.createUser)
router.post('/bulk-create', UserController.bulkCreateUser)
router.get('/getAll', UserController.getAllUsers)
router.get('/:id', UserController.getByIdUser)
router.put('/:id', UserController.updateUser)
router.put('/bulk-update', UserController.bulkUpdateUsers)
router.delete('/:id', UserController.deleteUser)

module.exports = router