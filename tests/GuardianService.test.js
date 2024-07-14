const { sequelize } = require('../models')
const GuardianService = require('../services/GuardianService')
const UserService = require('../services/UserService')


let guardianService 
let userService
let testUser

beforeAll(async () => {
	try {
        await sequelize.sync({ force: true })
        guardianService = new GuardianService()
        userService = new UserService()
        
        testUser = await userService.create({
            username: "TestUser",
            email: "testuser@example.com",
            password: "password123"
        })
    } catch (error) {
        console.log('Error syncing Sequelize:', error)
        throw error
    }
})

afterEach(async () => {
	await sequelize.truncate({ cascade: true })
})

afterAll(async () => {
	await sequelize.close()
})

describe('GuardianService test', () => {
	jest.setTimeout(90000)
	
	test('should create a new guardian', async () => {
		try {
			const guardian = {
				username: "Guardian1",
				email: "guardian1@example.com",
				password: "password123",
				userId: testUser.id
			}
            const createdGuardian = await guardianService.create(guardian)
            expect(createdGuardian).toMatchObject(guardian)
        } catch (error) {
            console.log('Error creating guardian:', error)
            throw error
        }
	}) 

	test('should retrieve all guardians', async () => {
		const guardian = {
            username: "Guardian1",
            email: "guardian1@example.com",
            password: "password123",
            userId: testUser.id
        }

        await guardianService.create(guardian)
        const guardians = await guardianService.getAll()
        expect(guardians.length).toBe(1)
        expect(guardians[0]).toMatchObject(guardian)
    })

	test('should retrieve a guardian by ID', async () => {
		const guardian = {
			username: "Test1User12",
			email: "test1@user12.com",
			password: "pass12345"
		}
        const createdGuardian = await guardianService.create(guardian)
        const foundGuardian = await guardianService.getById(createdGuardian.id)
        expect(foundGuardian).toMatchObject(createdGuardian)
    })

	test('should update a guardian by ID', async () => {
		const guardian = {
            username: "Guardian1",
            email: "guardian1@example.com",
            password: "password123",
            userId: testUser.id
        }
        const createdGuardian = await guardianService.create(guardian)
        const updatedData = { username: "UpdatedGuardian" }
        const updatedGuardian = await guardianService.update(createdGuardian.id, updatedData)
        expect(updatedGuardian.username).toBe("UpdatedGuardian");
    })

	test('should delete a guardian by ID', async () => {
		const guardian = {
			username: "Guardian1",
			email: "guardian1@example.com",
			password: "password123",
			userId: testUser.id
		};
	
		const createdGuardian = await guardianService.create(guardian)
		await guardianService.delete(createdGuardian.id)
		try {
			await guardianService.getById(createdGuardian.id)
		} catch (error) {
			expect(error.message).toBe('Record not found')
		}
	})
    
	test('should bulk create guardians', async () => {
		const bulkGuardians = [
			{ username: "Guardian1", email: "guardian1@example.com", password: "password123", userId: testUser.id },
            { username: "Guardian2", email: "guardian2@example.com", password: "password123", userId: testUser.id },
            { username: "Guardian3", email: "guardian3@example.com", password: "password123", userId: testUser.id }
		]

        const createdGuardian = await guardianService.bulkCreate(bulkGuardians)
        expect(createdGuardian.length).toBe(3)
        createdGuardian.forEach((guardian, index) => {
            expect(guardian).toMatchObject(bulkGuardians[index])
        })
    })

	test('should bulk update guardians', async () => {
		const bulkGuardians = [
            { username: "Guardian1", email: "guardian@example.com", password: "password123", userId: testUser.id },
            { username: "Guardian2", email: "guardian2@example.com", password: "password123", userId: testUser.id },
            { username: "Guardian3", email: "guardian3@example.com", password: "password123", userId: testUser.id }
        ]

        const createdGuardians = await guardianService.bulkCreate(bulkGuardians)
        const updates = createdGuardians.map(guardian => ({ id: guardian.id, username: `${guardian.username}_Updated` }))
        const updatedGuardians = await guardianService.updateBulk(updates)
        updatedGuardians.forEach((guardian, index) => {
            expect(guardian.username).toBe(`${bulkGuardians[index].username}_Updated`)
        })
    })
})