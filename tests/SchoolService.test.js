const { sequelize } = require('../models')
const SchoolService = require('../services/SchoolService')
const UserService = require('../services/UserService')


let schoolService 
let userService
let testUser

beforeAll(async () => {
	try {
        await sequelize.sync({ force: true })
        schoolService = new SchoolService()
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

describe('SchoolService test', () => {
	jest.setTimeout(90000)
	
	test('should create a new school', async () => {
		try {
			const school = {
				username: "School1",
				email: "school1@example.com",
				password: "password123",
				userId: testUser.id
			}
            const createdSchool = await schoolService.create(school)
            expect(createdSchool).toMatchObject(school)
        } catch (error) {
            console.log('Error creating school:', error)
            throw error
        }
	}) 

	test('should retrieve all schools', async () => {
		const school = {
            username: "School1",
            email: "school1@example.com",
            password: "password123",
            userId: testUser.id
        }

        await schoolServiceService.create(school);
        const schools = await schoolService.getAll();
        expect(schools.length).toBe(1);
        expect(schools[0]).toMatchObject(school);
    })

	test('should retrieve a school by ID', async () => {
		const school = {
			username: "Test1User12",
			email: "test111@user12.com",
			password: "pass12345"
		}
        const createdSchool = await schoolService.create(school)
        const foundSchool = await schoolService.getById(createdSchool.id)
        expect(foundSchool).toMatchObject(createdSchool)
    })

	test('should update a user by ID', async () => {
		const school = {
            username: "School1",
            email: "school1@example.com",
            password: "password123",
            userId: testUser.id
        }
        const createdSchool = await schoolService.create(school);
        const updatedData = { username: "UpdatedSchool" };
        const updatedSchool = await schoolService.update(createdSchool.id, updatedData);
        expect(updatedSchool.username).toBe("UpdatedSchool");
    })

	test('should delete a school by ID', async () => {
		const school = {
			username: "School1",
			email: "school1@example.com",
			password: "password123",
			userId: testUser.id
		};
	
		const createdSchool = await schoolService.create(school)
		await schoolService.delete(createdSchool.id)
		try {
			await schoolService.getById(createdSchool.id)
		} catch (error) {
			expect(error.message).toBe('Record not found')
		}
	})
    
	test('should bulk create schools', async () => {
		const bulkSchools = [
			{ username: "School1", email: "school1@example.com", password: "password123", userId: testUser.id },
            { username: "School2", email: "school2@example.com", password: "password123", userId: testUser.id },
            { username: "School3", email: "school3@example.com", password: "password123", userId: testUser.id }
		]

        const createdSchools = await schoolService.bulkCreate(bulkSchools)
        expect(createdSchools.length).toBe(3)
        createdSchools.forEach((school, index) => {
            expect(school).toMatchObject(bulkSchools[index])
        })
    })

	test('should bulk update schools', async () => {
		const bulkSchools = [
            { username: "School1", email: "school1@example.com", password: "password123", userId: testUser.id },
            { username: "School2", email: "school2@example.com", password: "password123", userId: testUser.id },
            { username: "School3", email: "school3@example.com", password: "password123", userId: testUser.id }
        ]

        const createdSchools = await schoolService.bulkCreate(bulkSchools)
        const updates = createdSchools.map(school => ({ id: school.id, username: `${school.username}_Updated` }))
        const updatedSchools = await schoolService.updateBulk(updates)
        updatedSchools.forEach((school, index) => {
            expect(school.username).toBe(`${bulkSchools[index].username}_Updated`)
        })
    })
})