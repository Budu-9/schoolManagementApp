const express = require('express')
const router = express.Router()
const TeacherController = require('../controllers/TeacherController')

router.post('/create', TeacherController.createTeacher)
router.post('/bulk-create', TeacherController.bulkCreateTeacher)
router.get('/getAll', TeacherController.getAllTeachers)
router.get('/:id', TeacherController.getByIdTeacher)
router.put('/:id', TeacherController.updateTeacher)
router.put('/bulk-update', TeacherController.bulkUpdateTeachers)
router.delete('/:id', TeacherController.deleteTeacher)

module.exports = router