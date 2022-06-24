const authController = require('./controllersAuth');
const authService = require('../services/auth.service');


describe('Login', () => {

    beforeAll(() => {
        console.log('before ALL');
    });

    beforeEach(() => {
        console.log('before Each');
    });

    test('User should login with correct creds', async () => {
        const next = jest.fn();       
        const req = {
            body: {
                email: "email@gmail.com",                   
                }
        };       
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn((data) => data),
            };

        authService.loginUser = jest.fn(() => {
            return {
                token: 'test-jwt-token',
                subscription: 'starter',
                }
            });

        const result = await authController.login(req, res, next);
        console.log(result);

        expect(result.code).toBe(200);
        expect(result.data.token).toBe('test-jwt-token');
        expect(result.data.user.subscription).toBe('starter');
        
        });
    })