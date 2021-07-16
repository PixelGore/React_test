import { Dispatch } from 'react';
import { UserType } from '../../types/types';
import { BaseThunkType, InferActionTypes } from './../reduxStore';

//Action Creators
export const actions = {
    IsFetchingAC: (isFetching: boolean) => ({ type: 'auth/IS_FETCHING', payload: isFetching } as const),
    logoutAC: () => ({ type: 'auth/LOGOUT' } as const),
    RegisterAC: (user: UserType) => ({ type: 'auth/REGISTER', payload: user } as const),
}
type ActionTypes = InferActionTypes<typeof actions>


//InitialState
let initialState = {
    users: [] as UserType[],
    me: "",
    isFetching: false,
    RegMsg: "",
    RegError: "",
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
        case "auth/LOGOUT":
            return {
                ...state,
                me: '',
            }
        default:
            return state
    }
}

// Thunks
type DispatchType = Dispatch<ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>


export const login = (username: string, password: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.IsFetchingAC(true))
        // await authAPI.Login(username, password)
        //     .then(async res => {
        //         let token = Object.values(res.data).toLocaleString()
        //         dispatch(actions.getAuthTokenAC(token))
        //         let meData = await authAPI.Me(token)
        //         dispatch(actions.getAuthMeAC(meData))
        //     })
        //     .catch(err => dispatch(actions.FetchLogErrorAC(err.response.data)))
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