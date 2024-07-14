const { sequelize } = require('../models')
const TeacherService = require('../services/TeacherService')
const UserService = require('../services/UserService')


let teacherService 
let userService
let testUser

beforeAll(async () => {
	try {
        await sequelize.sync({ force: true })
        teacherService = new TeacherService()
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

describe('TeacherService test', () => {
	jest.setTimeout(90000)
	
	test('should create a new teacher', async () => {
		try {
			const teacher = {
				username: "Teacher1",
				email: "teacher1@example.com",
				password: "password123",
				userId: testUser.id
			}
            const createdTeacher = await teacherService.create(teacher)
            expect(createdTeacher).toMatchObject(teacher)
        } catch (error) {
            console.log('Error creating teacher:', error)
            throw error
        }
	}) 

	test('should retrieve all teacher', async () => {
		const teacher = {
            username: "Teacher1",
            email: "teacher1@example.com",
            password: "password123",
            userId: testUser.id
        }

        await teacherService.create(teacher);
        const teachers = await teacherService.getAll()
        expect(teachers.length).toBe(1)
        expect(teachers[0]).toMatchObject(school)
    })

	test('should retrieve a teacher by ID', async () => {
		const teacher = {
			username: "Test1User12",
			email: "test1@user12.com",
			password: "pass12345"
		}
        const createdTeacher = await teacherService.create(teacher)
        const foundTeacher = await teacherService.getById(createdTeacher.id)
        expect(foundTeacher).toMatchObject(createdTeacher)
    })

	test('should update a teacher by ID', async () => {
		const teacher = {
            username: "Teacher1",
            email: "teacher1@example.com",
            password: "password123",
            userId: testUser.id
        }
        const createdTeacher = await teacherService.create(teacher)
        const updatedData = { username: "UpdatedTeacher" }
        const updatedTeacher = await teacherService.update(createdTeacher.id, updatedData)
        expect(updatedTeacher.username).toBe("UpdatedSchool");
    })

	test('should delete a teacher by ID', async () => {
		const teacher = {
			username: "Teacher1",
			email: "teacher1@example.com",
			password: "password123",
			userId: testUser.id
		};
	
		const createdTeacher = await teacherService.create(teacher)
		await teacherService.delete(createdTeacher.id)
		try {
			await teacherService.getById(createdTeacher.id)
		} catch (error) {
			expect(error.message).toBe('Record not found')
		}
	})
    
	test('should bulk create teachers', async () => {
		const bulkTeachers = [
			{ username: "Teacher1", email: "teacher1@example.com", password: "password123", userId: testUser.id },
            { username: "Teacher2", email: "teacher2@example.com", password: "password123", userId: testUser.id },
            { username: "Teacher3", email: "teacher3@example.com", password: "password123", userId: testUser.id }
		]

        const createdTeachers = await teacherService.bulkCreate(bulkTeachers)
        expect(createdTeachers.length).toBe(3)
        createdTeachers.forEach((teacher, index) => {
            expect(teacher).toMatchObject(bulkTeachers[index])
        })
    })

	test('should bulk update teachers', async () => {
		const bulkTeachers = [
            { username: "Teacher1", email: "teacher1@example.com", password: "password123", userId: testUser.id },
            { username: "Teacher2", email: "teacher2@example.com", password: "password123", userId: testUser.id },
            { username: "Teacher3", email: "teacher3@example.com", password: "password123", userId: testUser.id }
        ]

        const createdTeachers = await teacherService.bulkCreate(bulkTeachers)
        const updates = createdTeachers.map(teacher => ({ id: teacher.id, username: `${teacher.username}_Updated` }))
        const updatedTeachers = await teacherService.updateBulk(updates)
        updatedTeachers.forEach((teacher, index) => {
            expect(teacher.username).toBe(`${bulkTeachers[index].username}_Updated`)
        })
    })
})