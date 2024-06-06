const { User } = require('../models')

class UserService {
    // Create new user
    async createUser(userData) {
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw new Error('Error creating User')
        }
    }
    // Create bulk users
    async createBulkUsers(usersData) {
        try {
            const users = await User.bulkCreate(usersData)
            return users
        } catch (error) {
            throw new Error(error)
        }
    }
    // Find user by ID
    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId)
            if(!user) throw new Error('user not found')
            return user
        } catch (error) {
            throw new Error('Error fetching user')
        }
    }
    // Find all users
    async getAllUser(){
        try {
            const user = await User.findAll()
            return user
        } catch (error) {
            throw new Error('Error getting all users')
        }
    }
    // Update user by ID
    async updateUser(userId,userData){
        try {
            const user = await this.findByPk(userId)
            if (!user) {
                throw new Error('User not found')
            }
            await User.update(userData)
            return user
        } catch (error) {
            throw new Error('Error updating user')
        }
    }
    // Bulk update users
    async updateBulkUsers(usersData){
        try {
            const updatedUsers = []
            // Loop through each user data object in the usersData array
            for (const userData of usersData) {
                // Destructure the user data to get ID and rest of user fields
                const {id, ...updatedUserData} = userData
                // Update user record in DB where ID matches
                const [updatedCount] = await User.update(updatedUserData, { where: {id}})
                // If update was successful, fetch updated user record
                if (updatedCount === 1){
                    const user = await User.findByPk(id)
                    updatedUsers.push(user) // Adding the updated user record to updatedUsers array
                }
            }
            return updatedUsers
        } catch (error) {
            throw new Error('Error updating Users')
        }
    }
    // Delete User by ID
    async deleteUser(userId){
        try {
            const user = await this.getOneUser(userId)
            await User.destroy()
            return { message: 'User deleted successfully'}
        } catch (error) {
            throw new Error('Error deleting user')
        }
    }
}

module.exports = new UserService()