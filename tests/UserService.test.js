const { sequelize } = require('../models')
const UserService = require('../services/UserService')

let userService
beforeAll(async () => {
	await sequelize.sync()
	userService = new UserService()
})

afterEach(async () => {})

afterAll(async () => {
	await sequelize.close()
})

describe('UserService test', () => {
	jest.setTimeout(90000)
	
	test('should create a new user', async () => {
		try {
			const user = {
				username: "anon",
				email: "anon@user11.com",
				password: "pass1234"
			}
            const createdUser = await userService.create(user);
            expect(createdUser).toMatchObject(user);
        } catch (error) {
            console.log('Error creating user:', error);
            throw error
        }
	}) 

	test('should retrieve all users', async () => {
		const user = {
			username: "TestUser11",
			email: "test11@user11.com",
			password: "pass1234"
		}

        await userService.create(user)
        const users = await userService.getAll()
        expect(users.length).toBe(14);
        expect(users[0]).toMatchObject(user)
    })

	test('should retrieve a user by ID', async () => {
		const user = {
			username: "Test1User12",
			email: "test111@user12.com",
			password: "pass12345"
		}
        const createdUser = await userService.create(user);
        const foundUser = await userService.getById(createdUser.id)
        expect(foundUser).toMatchObject(createdUser)
    })

	test('should update a user by ID', async () => {
		const user = {
			username: "Test1User13",
			email: "test4@user13.com",
			password: "pass12345"
		}
        const createdUser = await userService.create(user)
        const updatedData = { username: "UpdatedUser" }
        const updatedUser = await userService.update(createdUser.id, updatedData)
        expect(updatedUser.username).toBe("UpdatedUser")
    })

	test('should delete a user by ID', async () => {
		const user = {
			username: "Test1User14",
			email: "test4@user14.com",
			password: "pass12345"
		}
        const createdUser = await userService.create(user)
        const deletedUser = await userService.delete(createdUser.id)
		expect (deletedUser).toBe(1)
		const findDeletedUser = await userService.getById(createdUser.id)
		expect(findDeletedUser).toBeNull()
    //     try {
    //         await userService.getById(createdUser.id);
    //     } catch (error) {
    //         expect(error.message).toBe('Record not found');
    //     }
     })

	test('should bulk create users', async () => {
		const bulkUsers = [
			{ username: "User15", email: "user015@user.com", password: "pass1234" },
			{ username: "User25", email: "user025@user.com", password: "pass1234" },
			{ username: "User35", email: "user035@user.com", password: "pass1234" }
		]

        const createdUsers = await userService.bulkCreate(bulkUsers)
        expect(createdUsers.length).toBe(3)
        createdUsers.forEach((user, index) => {
            expect(user).toMatchObject(bulkUsers[index])
        })
		
    })

	test('should bulk update users', async () => {
		const bulkUsers = [
			{ username: "User16", email: "user16@user.com", password: "pass1234" },
			{ username: "User26", email: "user26@user.com", password: "pass1234" },
			{ username: "User36", email: "user36@user.com", password: "pass1234" }
		]

        const createdUsers = await userService.bulkCreate(bulkUsers)
        const updates = createdUsers.map(user => ({ id: user.id, username: `${user.username}_Updated` }))
        const updatedUsers = await userService.updateBulk(updates)
        updatedUsers.forEach((user, index) => {
            expect(user.username).toBe(`${bulkUsers[index].username}_Updated`)
        })
    })
})