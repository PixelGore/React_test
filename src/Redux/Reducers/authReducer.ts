import { Dispatch } from 'react';
import { UserType } from '../../types/types';
import { BaseThunkType, InferActionTypes } from './../reduxStore';

//Action Creators
export const actions = {
    IsFetchingAC: (isFetching: boolean) => ({ type: 'auth/IS_FETCHING', payload: isFetching } as const),
    LoginAC: (user: {email:string, password:string}) => ({ type: 'auth/LOGIN', payload: user } as const),
    RegisterAC: (user: UserType) => ({ type: 'auth/REGISTER', payload: user } as const),
    logoutAC: () => ({ type: 'auth/LOGOUT' } as const),
}
type ActionTypes = InferActionTypes<typeof actions>


//InitialState
let initialState = {
    users: [] as UserType[],
    me: [] as string[],
    isFetching: false,
    RegMsg: "",
    RegError: "",
    LogError: ""
}
export type AuthInitialStorageStateType = typeof initialState


//Reducer
const authReducer = (state = initialState, action: ActionTypes): AuthInitialStorageStateType => {
    switch (action.type) {
        case "auth/IS_FETCHING":
            return {
                ...state,
                isFetching: action.payload
            }
        case "auth/REGISTER":
            const user = action.payload;
            const existUser = state.users.find(x => x.email === user.email)

            if (existUser) {
                return {
                    ...state,
                    users: state.users.map(stateItem =>
                        stateItem.email === existUser.email ? user : stateItem),
                    RegError: "A user with that email already exists"
                }
            } else {
                return {
                    ...state,
                    users: [...state.users, user],
                    RegMsg: "User registered successfully",
                    RegError: ""
                }
            }
        case "auth/LOGIN":
            const loguser = action.payload;
            const existentUser = state.users.find(x => x.email === loguser.email)
            if (existentUser) {
                return {
                    ...state,
                    // users: state.users.map(stateItem =>
                    //     stateItem.email === existUser.email ? user : stateItem),
                    // RegError: "A user with that email already exists"
                    me: state.users.map(stateItem =>
                        stateItem.password ===  existentUser.password ? loguser.email : '')
                }
            } else {
                return {
                    ...state,
                    LogError: "Unexistent user"
                }
            }

        case "auth/LOGOUT":
            return {
                ...state,
                me: [],
            }
        default:
            return state
    }
}

// Thunks
type DispatchType = Dispatch<ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>


export const login = (email: string, password: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.IsFetchingAC(true))
        dispatch(actions.LoginAC({email,password}))
        dispatch(actions.IsFetchingAC(false))
    }
}

export const register = (email: string, password: string, password2: string, first_name: string, last_name: string,): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.IsFetchingAC(true))
        dispatch(actions.RegisterAC({ email, password, password2, first_name, last_name }))
        dispatch(actions.IsFetchingAC(false))
    }
}

export const logout = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.IsFetchingAC(true))
        dispatch(actions.logoutAC())
        dispatch(actions.IsFetchingAC(false))
    }
}

export default authReducer;