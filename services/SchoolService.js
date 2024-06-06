const { School, User } = require('../models')

class SchoolService {
    // Create a new School
    async createSchool(schoolData) {
        try {
            // Ensure relationship exist with User
            const user = await User.findByPk(schoolData.userId)
            if(!user) {
                throw new Error('School not found')
            }
            const school = await School.create(schoolData)
            return school
        } catch (error) {
            throw new Error('Error creating school')
        }
    }
    //Bulk create Schools
    async bulkCreateSchools(schoolsData) {
        try {
            // Ensure relationships exist with User
            const userIds = schoolsData.map(school => school.userId)
            const users = await User.findAll({ where: {id: userIds} })
            if (users.length !== schoolsData.length) {
                throw new Error ('One or more users not found')
            }

            const schools = await School.bulkCreate(schoolsData)
            return schools
        } catch (error) {
            throw new Error('Error creating schools')
        }
    }
    // Find School by ID
    async getSchoolById(schoolId) {
        try {
            const school = await School.findByPk(schoolId, { include: [User]})
            if(!school) {
                throw new Error('School not found')
            }
            return school
        } catch (error) {
            throw new Error('Error fetching school')
        }
    }
    // Get all Schools
    async getAllSchools() {
        try {
            const schools = await School.findAll({ include: [User]})
            return schools
        } catch (error) {
            throw new Error('Error fetching schools')
        }
    }
    // Update school by ID
    async updateSchool(schoolId, updatedData) {
        try {
            const school = await School.findByPk(schoolId)
            if (!school) {
                throw new Error('School not found')
            }
            await school.update(updatedData)
            return school
        } catch (error) {
            throw new Error('Error updating school')
        }
    }
    // Bulk update Schools
    async updateBulkSchools(schoolsData){
        try {
            const updatedSchools = []
            // Loop through each school data object in the schoolsData array
            for (const schoolData of schoolsData) {
                // Destructure the school data to get ID and rest of school fields
                const {id, ...updatedSchoolData} = schoolData
                // Update school record in DB where ID matches
                const [updatedCount] = await School.update(updatedSchoolData, { where: {id}})
                // If update was successful, fetch updated school record in relationship with User
                if (updatedCount === 1){
                    const school = await School.findByPk(id, { include: [User]})
                    updatedSchools.push(school) // Adding the updated school record to updatedSchools array
                }
            }
            return updatedSchools
        } catch (error) {
            throw new Error('Error updating schools')
        }
    }
    //Delete school by ID
    async deleteSchool(schoolId) {
        try {
            const school = await School.findByPk(schoolId)
            if(!school) {
                throw new Error('School not found')
            }
            await School.destroy()
            return { message: 'School deleted successfully'}
        } catch (error) {
            throw new Error('Error deleting school')
        }
    }
}

module.exports = new SchoolService()