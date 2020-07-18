import * as actions from './auth.action'
import AuthActionTypes from './auth.types';

describe('sign in user action', () => {
    it('sign in start', () => {
        const mockUsername = 'username';
        const mockPassword = 'password';
    
        const action = actions.signInStart({mockUsername, mockPassword});
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_IN_START);
        expect(action.payload).toEqual({mockUsername, mockPassword});
    })

    it('sign in success', () => {
        const mockUsername = 'username';
        const mockToken = 'token';
    
        const action = actions.signInSuccess(mockToken, mockUsername);
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_IN_SUCCESS);
        expect(action.payload).toEqual({ 
            username: mockUsername,
            token: mockToken
        });
    })

    it('sign in fail', () => {
        const mockError = 'error';
    
        const action = actions.signInFail(mockError);
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_IN_FAIL);
        expect(action.payload).toEqual(mockError);
    })
})

describe('sign up user action', () => {
    it('sign up start', () => {
        const mockUsername = 'username';
        const mockEmail = 'email';
        const mockPassword = 'password1';
        const mockPasswordConfirmed = 'password1';
    
        const action = actions.signUpStart({mockUsername, mockEmail, mockPassword, mockPasswordConfirmed});
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_UP_START);
        expect(action.payload).toEqual({
            mockUsername,
            mockEmail,
            mockPassword,
            mockPasswordConfirmed
        });
    })

    it('sign up success', () => {
        const mockUsername = 'username';
        const mockToken = 'token';
    
        const action = actions.signUpSuccess(mockToken, mockUsername);
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_UP_SUCCESS);
        expect(action.payload).toEqual({ 
            username: mockUsername,
            token: mockToken
        });
    })

    it('sign up fail', () => {
        const mockError = 'error';
    
        const action = actions.signUpFail(mockError);
        
        expect(action.type).toEqual(AuthActionTypes.SIGN_UP_FAIL);
        expect(action.payload).toEqual(mockError);
    })
})
