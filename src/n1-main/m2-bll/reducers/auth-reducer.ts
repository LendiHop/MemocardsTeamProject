import { Dispatch } from "redux";
import {authAPI, LoginParamsType} from "../../m3-dal/auth-api/auth-api";
import {setProfileData} from "./profile-reducer";

let initialState: InitialStateType = {
    email: '',
    message: '',
    isRegistered: false,
    isLoggedIn: false
};

const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        // case 'FORGOT-PASSWORD':
        //     return {...state, email: action.email}
        case "AUTH/CHANGE-REGISTRATION":
            return {
                ...state,
                isRegistered: true
            };
        default:
            return state;
    }
}

//actions

export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const onRegistrationAC = () =>
    ({type: "AUTH/CHANGE-REGISTRATION"} as const)

export const AuthForgot = (email: string) => {
    return {type: 'FORGOT-PASSWORD', email}
}

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

export const onRegisterTC = (email: string, password: string) => async (dispatch: ThunkDispatch) => {
    try {
        const res = await authAPI.register(email, password)
        alert(res)
        // dispatch(onRegistrationAC())

    } catch (error) {
        debugger
        alert(error)
    }
}

// export const ForgotThunk = (email: string) => (dispatch: ThunkDispatch) => {
//     authAPI.forgot(email)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const action = AuthForgot(email)
//                 dispatch(action)
//             }
//
//         })
// }

//types
type InitialStateType = {
    email: string
    message: string
    isRegistered: boolean
    isLoggedIn: boolean
}

type ActionsType = ReturnType<typeof onRegistrationAC> | ReturnType<typeof setIsLoggedIn>

type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setProfileData>>

export default authReducer;