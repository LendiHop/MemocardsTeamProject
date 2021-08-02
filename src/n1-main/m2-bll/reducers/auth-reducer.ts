import {Dispatch} from "redux";
import {authAPI, UserType} from "../../m3-dal/auth-api/auth-api";
import {log} from "util";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {setAppStatusAC} from "./app-reduser";

const initialState = {

    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод
    created: new Date,
    updated: new Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: '',
    showCheckEmail: false,
    isRegistered: false,
    isNewPassword: true
};

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case 'FORGOT-PASSWORD':

            return {...state, email: action.email}

        case "AUTH/CHANGE-REGISTRATION":
            return {
                ...state,
                isRegistered: true
            }
        case "IS-LINK-ON-EMAIL":
            return {
                ...state, showCheckEmail: action.showCheckEmail
            }
        case "AUTH/CREATE-NEW-PASSWORD":
            return {...state, isNewPassword: action.isNewPassword}
        default:
            return state;
    }
}

//actions

export const onRegistrationAC = () => ({type: "AUTH/CHANGE-REGISTRATION"} as const)
export const createNewPasswordAC = (isNewPassword: boolean) => ({
    type: "AUTH/CREATE-NEW-PASSWORD",
    isNewPassword
} as const)

export const authForgotAC = (email: string) => ({type: 'FORGOT-PASSWORD', email} as const)

export const isShowCheckEmailAC = (showCheckEmail: boolean) => ({type: 'IS-LINK-ON-EMAIL', showCheckEmail} as const)


//thunks


export const onRegisterTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))

        const data = await authAPI.register(email, password)

        dispatch(onRegistrationAC())
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        if (e && email === email) {
            dispatch(onRegistrationAC())
        }
        handleServerNetworkError(e, dispatch)

    }
}

export const ForgotThunk = (email: string) => async (dispatch: Dispatch) => {
   try {
       dispatch(setAppStatusAC('loading'))
       const data = await authAPI.forgot(email)

       dispatch(authForgotAC(email))
       dispatch(isShowCheckEmailAC(true))
       dispatch(setAppStatusAC('succeeded'))
   }
   catch(e) {
            handleServerNetworkError(e, dispatch)
        }
}

export const createNewPassThunk = (password: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.setNewPass(password, token)

        dispatch(createNewPasswordAC(false))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}


//types

type InitialStateType = typeof initialState

type OnRegistrationACType = ReturnType<typeof onRegistrationAC>
type IsShowCheckEmailACType = ReturnType<typeof isShowCheckEmailAC>
type AuthForgotACType = ReturnType<typeof authForgotAC>
type CreateNewPasswordACType = ReturnType<typeof createNewPasswordAC>

export type ActionType =
    OnRegistrationACType
    | IsShowCheckEmailACType
    | AuthForgotACType
    | CreateNewPasswordACType


