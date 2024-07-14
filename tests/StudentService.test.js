const { sequelize } = require('../models')
const StudentService = require('../services/StudentService')
const GuardianService = require('../services/GuardianService')
const UserService = require('../services/UserService')

let studentService 
let guardianService 
let userService
let testUser
let testGuardian

beforeAll(async () => {
	try {
        await sequelize.sync({ force: true })
        studentService = new StudentService()
        guardianService = new GuardianService()
        userService = new UserService()
        
        testUser = await userService.create({
            username: "TestUser",
            email: "testuser@example.com",
            password: "password123"
        })
        testGuardian = await guardianService.create({
            username: "TestGuardian",
            email: "testguardian@example.com",
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

describe('StudentService test', () => {
	jest.setTimeout(90000)
	
	test('should create a new student', async () => {
		try {
			const student = {
				username: "Student1",
				email: "student1@example.com",
				password: "password123",
				userId: testUser.id,
                guardianId: testGuardian.id
			}
            const createdStudent = await studentService.create(student)
            expect(createdStudent).toMatchObject(student)
        } catch (error) {
            console.log('Error creating student:', error)
            throw error
        }
	}) 

	test('should retrieve all students', async () => {
		const student = {
            username: "Student1",
            email: "student1@example.com",
            password: "password123",
            userId: testUser.id,
            guardianId: testGuardian.id
        }

        await studentService.create(student)
        const students = await studentService.getAll()
        expect(students.length).toBe(1)
        expect(students[0]).toMatchObject(student)
    })

	test('should retrieve a student by ID', async () => {
		const student = {
			username: "Test1User12",
			email: "test1@user12.com",
			password: "pass12345"
		}
        const createdStudent = await studentService.create(student)
        const foundStudent = await studentService.getById(createdStudent.id)
        expect(foundStudent).toMatchObject(createdStudent)
    })

	test('should update a student by ID', async () => {
		const student = {
            username: "Student1",
            email: "student1@example.com",
            password: "password123",
            userId: testUser.id,
            guardianId: testGuardian.id
        }
        const createdStudent = await studentService.create(student)
        const updatedData = { username: "UpdatedStudent" }
        const UpdatedStudent = await studentService.update(createdStudent.id, updatedData)
        expect(UpdatedStudent.username).toBe("UpdatedStudent");
    })

	test('should delete a student by ID', async () => {
		const student = {
			username: "Student1",
			email: "student1@example.com",
			password: "password123",
			userId: testUser.id,
            guardianId: testGuardian.id
		};
	
		const createdStudent = await studentService.create(student)
		await studentService.delete(createdStudent.id)
		try {
			await studentService.getById(createdStudent.id)
		} catch (error) {
			expect(error.message).toBe('Record not found')
		}
	})
    
	test('should bulk create students', async () => {
		const bulkStudents = [
			{ username: "Student1", email: "student1@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id },
            { username: "Student2", email: "student2@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id },
            { username: "Student3", email: "student3@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id }
		]

        const createdStudent = await studentService.bulkCreate(bulkStudents)
        expect(createdStudent.length).toBe(3)
        createdStudent.forEach((student, index) => {
            expect(student).toMatchObject(bulkStudents[index])
        })
    })

	test('should bulk update students', async () => {
		const bulkStudents = [
            { username: "Student1", email: "student@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id },
            { username: "Student2", email: "student2@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id },
            { username: "Student3", email: "student3@example.com", password: "password123", userId: testUser.id, guardianId: testGuardian.id }
        ]

        const createdStudents = await studentService.bulkCreate(bulkStudents)
        const updates = createdStudents.map(student => ({ id: student.id, username: `${student.username}_Updated` }))
        const updatedStudents = await studentService.updateBulk(updates)
        updatedStudents.forEach((student, index) => {
            expect(student.username).toBe(`${bulkStudents[index].username}_Updated`)
        })
    })
})