const { Teacher, User } = require('../models')

class TeacherService {
    // Create a new Teacher
    async createTeacher(teacherData) {
        try {
            // Ensure relationship exist with User
            const user = await User.findByPk(teacherData.userId)
            if(!user) {
                throw new Error('User not found')
            }
            const teacher = await Teacher.create(teacherData)
            return teacher
        } catch (error) {
            throw new Error('Error creating teacher')
        }
    }
    //Bulk create Teachers
    async bulkCreateTeachers(teachersData) {
        try {
            // Ensure relationships exist with User
            const userIds = teachersData.map(teacher => teacher.userId)
            const users = await User.findAll({ where: {id: userIds} })
            if (users.length !== teachersData.length) {
                throw new Error ('One or more users not found')
            }

            const teachers = await Teacher.bulkCreate(teachersData)
            return teachers
        } catch (error) {
            throw new Error('Error creating teachers')
        }
    }
    // Find Teacher by ID
    async getTeacherById(teacherId) {
        try {
            const teacher = await Teacher.findByPk(teacherId, { include: [User]})
            if(!teacher) {
                throw new Error('Teacher not found')
            }
            return teacher
        } catch (error) {
            throw new Error('Error fetching teacher')
        }
    }
    // Get all Teachers
    async getAllTeachers() {
        try {
            const teachers = await Teacher.findAll({ include: [User]})
            return teachers
        } catch (error) {
            throw new Error('Error fetching teachers')
        }
    }
    // Update teacher by ID
    async updateTeacher(teacherId, updatedData) {
        try {
            const teacher = await Teacher.findByPk(teacherId)
            if (!teacher) {
                throw new Error('Teacher not found')
            }
            await teacher.update(updatedData)
            return teacher
        } catch (error) {
            throw new Error('Error updating teacher')
        }
    }
    // Bulk update Teachers
    async updateBulkTeachers(teachersData){
        try {
            const updatedTeachers = []
            // Loop through each teacher data object in the teachersData array
            for (const teacherData of teachersData) {
                // Destructure the teacher data to get ID and rest of teacher fields
                const {id, ...updatedTeacherData} = teacherData
                // Update teacher record in DB where ID matches
                const [updatedCount] = await Teacher.update(updatedTeacherData, { where: {id}})
                // If update was successful, fetch updated teacher record with relationship with User
                if (updatedCount === 1){
                    const teacher = await Teacher.findByPk(id, { include: [User]})
                    updatedTeachers.push(teacher) // Adding the updated teacher record to updatedTeachers array
                }
            }
            return updatedTeachers
        } catch (error) {
            throw new Error('Error updating teachers')
        }
    }
    //Delete teacher by ID
    async deleteTeacher(teacherId) {
        try {
            const teacher = await Teacher.findByPk(teacherId)
            if(!teacher) {
                throw new Error('Teacher not found')
            }
            await Teacher.destroy()
            return { message: 'Teacher deleted successfully'}
        } catch (error) {
            throw new Error('Error deleting teacher')
        }
    }
}

module.exports = new TeacherService()