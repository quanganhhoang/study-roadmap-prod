import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as sagas from './auth.sagas'
import AuthActionTypes from './auth.types'

describe('on email sign in start saga', () => {
    it('should trigger on EMAIL_SIGN_IN_START', () => {
        const generator = sagas.watchEmailSignInStart();
        expect(generator.next().value).toEqual(
        takeLatest(AuthActionTypes.SIGN_IN_START, sagas.signInWithEmail)
        );
    });
});

describe('on email sign up saga', () => {
    it('should trigger on SIGN_UP_START', () => {
        const generator = sagas.watchSignUpStart();
        expect(generator.next().value).toEqual(
            takeLatest(AuthActionTypes.SIGN_UP_START, sagas.signUp)
        );
    });
});

describe('on fetch user saga', () => {
    it('should trigger on SIGN_UP_SUCCESS', () => {
        const generator = sagas.watchFetchUser();
        expect(generator.next().value).toEqual(
            takeEvery(
                [AuthActionTypes.SIGN_IN_SUCCESS, AuthActionTypes.SIGN_UP_SUCCESS],
                sagas.fetchUser
            )
        )
    })
})