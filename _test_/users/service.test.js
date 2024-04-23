const UsersService = require('../../users/service');
const mongoose = require('mongoose');

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    hash: jest.fn(),
}));

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');


describe('UsersService', () => {

    let User;
    let UsersService;

    beforeEach(() => {
        const mockQuery = {
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            exec: jest.fn(),
        };
        User = {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn()
        }
        bcrypt.hash.mockReset();
        bcrypt.compare.mockReset();
        jwt.sign.mockReset();
        
        UsersService = new UsersService({User});
    })

    test('CreatUser Test', async () => {
        User.findOne.mockResolvedValue(new mongoose.Types.ObjectId());
        const result = await UsersService.createUser({email: 'test@test.com'});
        expect(result).toEqual({message: 'A user with this email already exists!'});
    });
})