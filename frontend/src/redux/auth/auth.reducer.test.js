import authReducer from './auth.reducer'
import * as authActions from './auth.action'

const INITIAL_STATE = {
    token: null,
    error: null,
    loading: false,
    user: null,
}


describe('authReducer', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(INITIAL_STATE);
    })

    it('should start signing in with sign in action', () => {
        const mockUsername = 'username';
        const mockPassword = 'password';

        expect(
            authReducer(INITIAL_STATE, authActions.signInStart(mockUsername, mockPassword)).loading
        ).toBe(true)
    })

    it ('should sign in user with sign in success action', () => {
        const mockToken = 'token';
        const mockUsername = 'username';
        
        const nextState = authReducer(INITIAL_STATE, authActions.signInSuccess(mockToken, mockUsername));

        expect(nextState.loading).toBe(false);
        expect(nextState.token).toEqual(mockToken);
        expect(nextState.username).toEqual(mockUsername)
    })
})


