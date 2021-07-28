import {ProfileDataType} from "../../a1-loginization/api/api";

const initialState: ProfileDataType = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,

    created: new Date(2013, 2, 1, 0, 70),
    updated: new Date(2015, 2, 1, 0, 70),
    isAdmin: false,
    verified: false ,
    rememberMe: false,

    error: "",
}

export const profileReducer = (state: ProfileDataType = initialState, action: ActionsType): ProfileDataType => {
    switch (action.type) {
        case 'profile/SET-PROFILE-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

export const setProfileData = (data: ProfileDataType) =>
    ({type: 'profile/SET-PROFILE-DATA', data} as const)


type ActionsType = ReturnType<typeof setProfileData>