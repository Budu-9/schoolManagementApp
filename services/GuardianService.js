const { Guardian, User } = require('../models')

class GuardianService {
    // Create a new School
    async createGuardian(guardianData) {
        try {
            // Ensure relationship exist with User
            const user = await User.findByPk(guardianData.userId)
            if(!user) {
                throw new Error('Guardian not found')
            }
            const guardian = await Guardian.create(guardianData)
            return guardian
        } catch (error) {
            throw new Error('Error creating guardian')
        }
    }
    //Bulk create Guardians
    async bulkCreateGuardians(guardiansData) {
        try {
            // Ensure relationships exist with User
            const userIds = guardiansData.map(guardian => guardian.userId)
            const users = await User.findAll({ where: {id: userIds} })
            if (users.length !== guardiansData.length) {
                throw new Error ('One or more users not found')
            }

            const guardians = await Guardian.bulkCreate(guardiansData)
            return guardians
        } catch (error) {
            throw new Error('Error creating guardians')
        }
    }
    // Find Guardian by ID
    async getGuardianById(guardianId) {
        try {
            const guardian = await Guardian.findByPk(guardianId, { include: [User]})
            if(!guardian) {
                throw new Error('Guardian not found')
            }
            return guardian
        } catch (error) {
            throw new Error('Error fetching guardian')
        }
    }
    // Get all Guardians
    async getAllGuardians() {
        try {
            const guardians = await Guardian.findAll({ include: [User]})
            return guardians
        } catch (error) {
            throw new Error('Error fetching guardians')
        }
    }
    // Update guardian by ID
    async updateGuardian(guardianId, updatedData) {
        try {
            const guardian = await Guardian.findByPk(guardianId)
            if (!guardian) {
                throw new Error('Guardian not found')
            }
            await guardian.update(updatedData)
            return guardian
        } catch (error) {
            throw new Error('Error updating guardian')
        }
    }
    // Bulk update Guardians
    async updateBulkGuardians(guardiansData){
        try {
            const updatedGuardians = []
            // Loop through each guardian data object in the guardiansData array
            for (const guardianData of guardiansData) {
                // Destructure the guardian data to get ID and rest of guardian fields
                const {id, ...updatedGuardianData} = guardianData
                // Update guardian record in DB where ID matches
                const [updatedCount] = await Guardian.update(updatedGuardianData, { where: {id}})
                // If update was successful, fetch updated guardian record in relationship with User
                if (updatedCount === 1){
                    const guardian = await Guardian.findByPk(id, { include: [User]})
                    updatedGuardians.push(guardian) // Adding the updated guardian record to updatedGuardians array
                }
            }
            return updatedGuardians
        } catch (error) {
            throw new Error('Error updating guardians')
        }
    }
    //Delete guardian by ID
    async deleteGuardian(guardianId) {
        try {
            const guardian = await Guardian.findByPk(guardianId)
            if(!guardian) {
                throw new Error('Guardian not found')
            }
            await Guardian.destroy()
            return { message: 'Guardian deleted successfully'}
        } catch (error) {
            throw new Error('Error deleting guardian')
        }
    }
}

module.exports = new GuardianService()