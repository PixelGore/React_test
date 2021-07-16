import { AppStateType } from '../reduxStore';

export const getRegError = (state: AppStateType) => {
    return state.auth.RegError
}

export const getRegMsg = (state: AppStateType) => {
    return state.auth.RegMsg
}

export const getAuthMe = (state: AppStateType) => {
    return state.auth.me
}

export const getisFetching = (state: AppStateType) => {
    return state.auth.isFetching
}
