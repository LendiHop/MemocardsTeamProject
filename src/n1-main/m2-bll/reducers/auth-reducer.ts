import { Dispatch } from "redux";
import {authAPI, LoginParamsType} from "../../m3-dal/auth-api/auth-api";
import {setProfileData} from "./profile-reducer";
import {Dispatch} from "redux";
import {authAPI, UserType} from "../../m3-dal/auth-api/auth-api";
import {log} from "util";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {setAppStatusAC} from "./app-reduser";

const initialState: InitialStateType = {
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
    message: '',
    isRegistered: false,
    isLoggedIn: false
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
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

export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const onRegistrationAC = () =>
    ({type: "AUTH/CHANGE-REGISTRATION"} as const)

export const createNewPasswordAC = (isNewPassword: boolean) =>
    ({type: "AUTH/CREATE-NEW-PASSWORD", isNewPassword} as const)

export const authForgotAC = (email: string) =>
    ({type: 'FORGOT-PASSWORD', email} as const)

export const isShowCheckEmailAC = (showCheckEmail: boolean) =>
    ({type: 'IS-LINK-ON-EMAIL', showCheckEmail} as const)


//thunks

export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedIn(true))
            dispatch(setProfileData(res.data))
        })
        .catch ((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

export const logoutTC = () => (dispatch: ThunkDispatch) => {
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedIn(false))
        })
        .catch ((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

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
type InitialStateType = {
    email: string
    message: string
    isRegistered: boolean
    isLoggedIn: boolean
}

type ActionsType = ReturnType<typeof onRegistrationAC>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof isShowCheckEmailAC>
    | ReturnType<typeof authForgotAC>
    | ReturnType<typeof createNewPasswordAC>

type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setProfileData>>

export default authReducer;