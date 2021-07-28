import React from "react";
import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/auth-api/auth-api";


type InitialStateType = typeof initialState

let initialState = {
    email: '',
    message: ''

};

type ActionsType = ReturnType<typeof AuthForgot>



const authReducer = (state: InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        //тут тоже пишете свою обработку, потом будем мержить
        // case "INITIALIZE_SUCCESS":
        //     return {
        //         ...state,
        //         initialized: true
        //     };
        case 'FORGOT-PASSWORD':
            return {...state, email: action.email}

        default:
            return state;
    }
}

//Actions
export const AuthForgot = (email: string) => {
    return {type: 'FORGOT-PASSWORD', email}

}

//Thunks

export const ForgotThunk = (email: string) => (dispatch: Dispatch) => {
    authAPI.forgot(email)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = AuthForgot(email)
                dispatch(action)
            }else {

            }

        })
}




export default authReducer;