import { Dispatch } from "redux";
import { authAPI } from "../../m3-dal/auth-api/auth-api";

let initialState = {
    email: '',
    message: '',
    isRegistered: false
};

const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'FORGOT-PASSWORD':
            return {...state, email: action.email}
        case "INITIALIZE_SUCCESS":
            return {
                ...state,
                initialized: true
            };
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

export const onRegistrationAC = () =>
    ({type: "AUTH/CHANGE-REGISTRATION"} as const)

export const AuthForgot = (email: string) => {
    return {type: 'FORGOT-PASSWORD', email}

}

//thunks

export const onRegisterTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {

        // const res = await authAPI.register(email, password)
        const res = await authAPI.register(email, password)
        alert(res)
        // dispatch(onRegistrationAC())

    } catch (error) {
        debugger
        alert(error)
    }
}

export const ForgotThunk = (email: string) => (dispatch: Dispatch) => {
    authAPI.forgot(email)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = AuthForgot(email)
                dispatch(action)
            }

        })
        .catch((error) => {
           console.log(error)
        })

}

//types
type OnRegistrationAC = ReturnType<typeof onRegistrationAC>
type ActionType = OnRegistrationAC

export default authReducer;