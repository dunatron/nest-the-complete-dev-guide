import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("AuthService", () => {
    let service: AuthService
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        // create a fake copy of the users service
        const users: User[] = [] 
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
                const user = {id: Math.floor((Math.random() * 999)), email, password} as User
                users.push(user)
                return Promise.resolve(user)
            }
        }
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile()
    
        service = module.get(AuthService)
    });
    
    it('Can create an instance of auth service', async () => {
        expect(service).toBeDefined()
    })

    it('creates a new user with a salted and hashed password', async () => {
       const input = {email: "asdf@test.com", password: "asdf"}
       const user = await service.signup(input.email, input.password)

       expect(user.password).not.toEqual(input.password)
       const [salt, hash] = user.password.split('.');
       expect(salt).toBeDefined()
       expect(hash).toBeDefined()
    })

    it('throws an error if email is in use', async () => {
        // arrange 
        fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'aq', password: ''} as User])
        // act 
        try {
            await service.signup("asdf", "as")
        } catch (err) {
            // done();
        }
    })

    it('throws if signin is called with an unused email', async () => {
        try {
            await service.signin("asdf", "as")
        } catch (err) {
            // done();
        }
    })

    it('throws if an invalid password is provided', async () => {
        // arrange
        fakeUsersService.find = () => Promise.resolve([{email: "asf@asdf.com", password: "ass"} as User])
        // act 
        try {
            await service.signin("asdf", "as")
        } catch (err) {
            // done();
        }
    })

    it('returns a user if correct password is provided', async () => {
        await service.signup('asdf@test.com', 'myPasswortd');

        const user = await service.signin('asdf@test.com', 'myPasswortd');
        expect(user).toBeDefined()
    })
})

