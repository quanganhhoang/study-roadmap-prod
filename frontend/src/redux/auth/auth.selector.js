import { createSelector } from 'reselect'

export const selectAuth = state => state.auth;

export const selectUser = createSelector(
    [selectAuth],
    auth => auth.user
)