import {authAPI} from "../../m3-dal/auth-api";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reduser";
import {handleServerNetworkError} from "../../m0-utils/error-utils";
import {Dispatch} from "redux";

const initialState: ProfileDataType = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: new Date(2013, 2, 1, 0, 70),
    updated: new Date(2015, 2, 1, 0, 70),
    isAdmin: false,
    verified: false ,
    rememberMe: false,
    error: "",
}

export const profileReducer = (state: ProfileDataType = initialState, action: ActionsType): ProfileDataType => {
    switch (action.type) {
        case 'profile/SET-PROFILE-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

//actions

export const setProfileData = (data: ProfileDataType) =>
    ({type: 'profile/SET-PROFILE-DATA', data} as const)

//thunk
export const editProfileTC = (name?: string, avatar?: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.editProfile(name, avatar)
        .then(res => {
            dispatch(setProfileData(res.updatedUser))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch ((e) => {
            handleServerNetworkError(e, dispatch)
        })
}

//types

export type ProfileDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

type ActionsType = ReturnType<typeof setProfileData>
type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setAppStatusAC> | SetAppErrorActionType | SetAppStatusActionType>