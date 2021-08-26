
import { Dispatch } from 'redux';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../m2-bll/b1-reducers/app-reduser";


// generic function
// export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC('Some error occurred'))
//     }
//     dispatch(setAppStatusAC('failed'))
// }

export const handleServerNetworkError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
    console.log(error)
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'))
}

export type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>