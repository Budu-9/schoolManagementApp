const express = require('express')
const router = express.Router()
const GuardianController = require('../controllers/GuardianController')

router.post('/create', GuardianController.createGuardian)
router.post('/bulk-create', GuardianController.bulkCreateGuardian)
router.get('/getAll', GuardianController.getAllGuardians)
router.get('/:id', GuardianController.getByIdGuardian)
router.put('/:id', GuardianController.updateGuardian)
router.put('/bulk-update', GuardianController.bulkUpdateGuardians)
router.delete('/:id', GuardianController.deleteGuardian)

module.exports = router