const { Student, User } = require('../models')

class StudentService {
    // Create a new Student
    async createStudent(studentData) {
        try {
            // Ensure relationship exist with User
            const user = await User.findByPk(studentData.userId)
            if(!user) {
                throw new Error('Student not found')
            }
            const student = await Student.create(studentData)
            return student
        } catch (error) {
            throw new Error('Error creating student')
        }
    }
    //Bulk create Students
    async bulkCreateStudents(studentsData) {
        try {
            // Ensure relationships exist with User
            const userIds = studentsData.map(student => student.userId)
            const users = await User.findAll({ where: {id: userIds} })
            if (users.length !== studentsData.length) {
                throw new Error ('One or more users not found')
            }

            const students = await Student.bulkCreate(studentsData)
            return students
        } catch (error) {
            throw new Error('Error creating students')
        }
    }
    // Find Student by ID
    async getStudentById(studentId) {
        try {
            const student = await Student.findByPk(studentId, { include: [User]})
            if(!student) {
                throw new Error('Student not found')
            }
            return student
        } catch (error) {
            throw new Error('Error fetching student')
        }
    }
    // Get all Students
    async getAllStudents() {
        try {
            const students = await Student.findAll({ include: [User]})
            return students
        } catch (error) {
            throw new Error('Error fetching students')
        }
    }
    // Update student by ID
    async updateStudent(studentId, updatedData) {
        try {
            const student = await Student.findByPk(studentId)
            if (!student) {
                throw new Error('Student not found')
            }
            await student.update(updatedData)
            return student
        } catch (error) {
            throw new Error('Error updating student')
        }
    }
    // Bulk update Students
    async updateBulkStudents(studentsData){
        try {
            const updatedStudents = []
            // Loop through each student data object in the studentsData array
            for (const studentData of studentsData) {
                // Destructure the student data to get ID and rest of student fields
                const {id, ...updatedStudentData} = studentData
                // Update student record in DB where ID matches
                const [updatedCount] = await Student.update(updatedStudentData, { where: {id}})
                // If update was successful, fetch updated student record in relationship with User
                if (updatedCount === 1){
                    const student = await Student.findByPk(id, { include: [User]})
                    updatedStudents.push(student) // Adding the updated student record to updatedStudents array
                }
            }
            return updatedStudents
        } catch (error) {
            throw new Error('Error updating students')
        }
    }
    //Delete student by ID
    async deleteStudent(studentId) {
        try {
            const student = await Student.findByPk(studentId)
            if(!student) {
                throw new Error('Student not found')
            }
            await Student.destroy()
            return { message: 'Student deleted successfully'}
        } catch (error) {
            throw new Error('Error deleting student')
        }
    }
}

module.exports = new StudentService()