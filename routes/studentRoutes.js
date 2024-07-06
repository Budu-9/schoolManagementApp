const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/StudentController')

router.post('/create', StudentController.createStudent)
router.post('/bulk-create', StudentController.bulkCreateStudent)
router.get('/getAll', StudentController.getAllStudents)
router.get('/:id', StudentController.getByIdStudent)
router.put('/:id', StudentController.updateStudent)
router.put('/bulk-update', StudentController.bulkUpdateStudent)
router.delete('/:id', StudentController.deleteStudent)

module.exports = router