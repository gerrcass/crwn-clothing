import {createSelector} from 'reselect'

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser 
)

/* example using several inputs:

const selectUser = state => state.user
const selectCart = state => state.cart

export const selectCurrentUser = createSelector(
       this array [selectUser,selectCart] could be passed in using successive
       arguments which order must be match last function's argument order
       e.g:
    
    selectUser,
    selectCart,
    (user,cart) => user.currentUser

    instead of

    [selectUser,selectCart],
    (user,cart) => user.currentUser 
) */