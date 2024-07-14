class BaseService {
    constructor(model) {
        this.model = model
    }

    // Create new user
    async create(data) {
        try {
            const record = await this.model.create(data)
            return record
        } catch (error) {
            throw new Error(`Error creating record: ${error.message}`)
        }
    }

    // Create bulk users
    async bulkCreate(dataArray) {
        try {
            const records = await this.model.bulkCreate(dataArray)
            return records
        } catch (error) {
            throw new Error(`Error creating records: ${error.message}`)
        }
    }

    // Find all users
    async getAll() {
        try {
            const records = await this.model.findAll()
            return records
        } catch (error) {
            throw new Error(`Error fetching records: ${error.message}`)
        }
    }

    // Find user by ID
    async getById(id, options = {}) {
        try {
            const record = await this.model.findByPk(id, options)
            if(!record) {
                throw new Error('Record not found')
            }
            return record
        } catch (error) {
            console.log('Error fetching record', error)
            throw new Error(`Error fetching record: ${error.message}`)  
        }
    }

     // Update user by ID
    async update(id, data) {
        try {
            const record = await this.model.findByPk(id)
            if(!record) {
                throw new Error('Record not found')
            }
            await record.update(data)
            return record
        } catch (error) {
            throw new Error(`Error updating record: ${error.message}`)
        }
    }

    // Bulk update users
    async updateBulk(dataArray) {
        try {
            const updatedRecords = []
            // Loop through each data object in the dataArray array
            for (const data of dataArray) {
                // Destructure the data to get ID and rest of record fields
                const { id, ...updateData} = data
                // Update record in DB where ID matches
                const [updateCount] = await this.model.update(updateData, { where: { id }})
                // If update was successful, fetch updated record
                if (updateCount === 1) {
                    const updatedRecord = await this.model.findByPk(id)
                    updatedRecords.push(updatedRecord) //Adding the updated record to updatedRecords array
                }
            }
            return updatedRecords
        } catch (error) {
            throw new Error(`Error updating records: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            const record = await this.model.findByPk(id)
            if(!record) {
                throw new Error('Record not found')
            }
            await record.destroy()
            return { message: 'Record deleted successfully'}
        } catch (error) {
            throw new Error(`Error deleting record: ${error.message}`)
        }
    }
}

module.exports = BaseService