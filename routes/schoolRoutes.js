const express = require('express')
const router = express.Router()
const SchoolController = require('../controllers/SchoolController')

router.post('/create', SchoolController.createSchool)
router.post('/bulk-create', SchoolController.bulkCreateSchool)
router.get('/getAll', SchoolController.getAllSchools)
router.get('/:id', SchoolController.getByIdSchool)
router.put('/:id', SchoolController.updateSchool)
router.put('/bulk-update', SchoolController.bulkUpdateSchools)
router.delete('/:id', SchoolController.deleteSchool)

module.exports = router
