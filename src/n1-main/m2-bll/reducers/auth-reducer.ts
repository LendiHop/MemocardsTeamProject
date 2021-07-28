import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/auth-api/auth-api";

let initialState = {
    email: '',


    showInfoMessage: false,
    isRegistered: false,
    isNewPassword: false
};

const authReducer = (state: any = initialState, action: ActionType) => {
    switch (action.type) {
        case 'FORGOT-PASSWORD':

            return {...state, email: action.email}

        case "AUTH/CHANGE-REGISTRATION":
            return {
                ...state,
                isRegistered: true
            };
        case "IS-LINK-ON-EMAIL":
            return {
                ...state, showInfoMessage: action.showInfoMessage
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

export const isShowInfoMessageAC = (showInfoMessage: boolean) => ({type: 'IS-LINK-ON-EMAIL', showInfoMessage} as const)


//thunks

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
    const message = 'message: `<div style="background-color: lime; padding: 15px">\t\terror: string;\t\n' +
        '\tpassword recovery link: \t}\t\n' +
        '\t<a href=\'http://localhost:3000/#/set-new-password/$token$\'>\t\t\n' +
        '\tlink</a></div>` // хтмп-письмо, вместо $token$ бэк вставит токен\t\t'

    const from = "test-front-admin <ai73a@yandex.by>"// можно указать разработчика фронта)

    const data = {email, from: from, message: message}
    authAPI.forgot(data)
        .then(res => {

            dispatch(authForgotAC(email))
            dispatch(isShowInfoMessageAC(true))


        })
        .catch(e => {
            alert(e)
        })
}

export const createNewPassThunk = (password: string) => (dispatch: Dispatch) => {
    try {
        const res = authAPI.setNewPass(password)
        debugger
        dispatch(createNewPasswordAC(false))
    } catch (e) {
        alert(e)
    }
}


//types
type OnRegistrationACType = ReturnType<typeof onRegistrationAC>
type IsShowInfoMessageACType = ReturnType<typeof isShowInfoMessageAC>
type AuthForgotACType = ReturnType<typeof authForgotAC>
type CreateNewPasswordACType = ReturnType<typeof createNewPasswordAC>
type ActionType = OnRegistrationACType | IsShowInfoMessageACType | AuthForgotACType | CreateNewPasswordACType

export default authReducer;