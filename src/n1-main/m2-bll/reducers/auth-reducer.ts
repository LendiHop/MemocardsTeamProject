import {Dispatch} from "redux";
import {authAPI} from "../../m3-dal/auth-api/auth-api";

const CHANGE_REGISTRATION = 'AUTH/CHANGE-REGISTRATION'

let initialState = {
    isRegistered: false
};

const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        //тут тоже пишете свою обработку, потом будем мержить
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

const onRegistrationAC = () =>
    ({type: CHANGE_REGISTRATION} as const)

//thunks

export const onRegisterTC = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {

        // const res = await authAPI.register(email, password)
        const res = await authAPI.me()
        alert(res)
        // dispatch(onRegistrationAC())

    } catch (error) {
        debugger
        alert(error)
    }
}
export default authReducer;

//types
type OnRegistrationAC = ReturnType<typeof onRegistrationAC>
type ActionType = OnRegistrationAC

