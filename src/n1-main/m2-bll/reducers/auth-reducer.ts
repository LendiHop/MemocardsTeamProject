import {Dispatch} from "redux";
import {authAPI, UserType} from "../../m3-dal/auth-api/auth-api";

const initialState = {
    isInitialized: false,
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
        case "AUTH/IS-INITIALIZED":
            return {...state, isInitialized: true, ...action.data}

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
export const isInitializedAC = (data: UserType) => ({type: 'AUTH/IS-INITIALIZED', data} as const)
export const onRegistrationAC = () => ({type: "AUTH/CHANGE-REGISTRATION"} as const)
export const createNewPasswordAC = (isNewPassword: boolean) => ({
    type: "AUTH/CREATE-NEW-PASSWORD",
    isNewPassword
} as const)

export const authForgotAC = (email: string) => ({type: 'FORGOT-PASSWORD', email} as const)

export const isShowCheckEmailAC = (showCheckEmail: boolean) => ({type: 'IS-LINK-ON-EMAIL', showCheckEmail} as const)


//thunks
export const isAuthMeTC = () => async (dispatch: Dispatch) => {
    try{
        const res = await authAPI.me()

        dispatch(isInitializedAC(res.data))
    }
    catch (e)  {

    }
}

export const onRegisterTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {


        const res = await authAPI.register(email, password)

        dispatch(onRegistrationAC())

    } catch (error) {
        if (error && email === email) {
            dispatch(onRegistrationAC())
        }
    }
}

export const ForgotThunk = (email: string) => (dispatch: Dispatch) => {

    authAPI.forgot(email)
        .then(res => {
            dispatch(authForgotAC(email))
            dispatch(isShowCheckEmailAC(true))

        })
        .catch(e => {
            alert(e)
        })
}

export const createNewPassThunk = (password: string, token: string) => (dispatch: Dispatch) => {
    try {
        const res = authAPI.setNewPass(password, token)

        dispatch(createNewPasswordAC(false))
    } catch (e) {
        alert(e)
    }
}


//types

type InitialStateType = typeof initialState
//     {
//     isInitialized: boolean
//     _id: string
//     email: string
//     name: string
//     avatar: string
//     publicCardPacksCount: number // количество колод
//     created: Date
//     updated: Date
//     isAdmin: boolean
//     verified: boolean // подтвердил ли почту
//     rememberMe: boolean
//     error: string
//     showCheckEmail: boolean
//     isRegistered: boolean
//     isNewPassword: boolean
// }
type OnRegistrationACType = ReturnType<typeof onRegistrationAC>
type IsShowCheckEmailACType = ReturnType<typeof isShowCheckEmailAC>
type AuthForgotACType = ReturnType<typeof authForgotAC>
type CreateNewPasswordACType = ReturnType<typeof createNewPasswordAC>
type IsInitializedACType = ReturnType<typeof isInitializedAC>
export type ActionType =
    OnRegistrationACType
    | IsShowCheckEmailACType
    | AuthForgotACType
    | CreateNewPasswordACType
    | IsInitializedACType

