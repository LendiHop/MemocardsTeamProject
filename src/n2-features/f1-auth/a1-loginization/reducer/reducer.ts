import { Dispatch } from "redux";
import {loginAPI, LoginParamsType} from "../api/api";
import {setProfileData} from "../../a5-profile/reducer/reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const login = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    loginAPI.login(data)
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

export const logout = () => (dispatch: ThunkDispatch) => {
    loginAPI.logout()
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

type ActionsType = ReturnType<typeof setIsLoggedIn>
type InitialStateType = {
    isLoggedIn: boolean
}



type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setProfileData>>