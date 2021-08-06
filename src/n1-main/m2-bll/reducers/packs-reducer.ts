import {AddedPackType, packsAPI, packsParamsType, UpdatedPackType} from "../../m3-dal/api/packs-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reduser";
import {AppRootStateType} from "../store/redux-store";
import {ThunkAction} from "redux-thunk";

const initialState: PacksDataType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            name: "",
            path: "",
            cardsCount: 0,
            grade: 0, // средняя оценка карточек
            shots: 0, // количество попыток
            rating: 0, // лайки
            type: "", // ещё будет "folder" (папка)
            created: new Date(2013, 2, 1, 0, 70),
            updated: new Date(2014, 2, 1, 0, 70),
            __v: 0
        },
    ],
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0, // количество элементов на странице
}

export const packsReducer = (state: PacksDataType = initialState, action: ActionsType): PacksDataType => {
    switch (action.type) {
        case 'packs/SET-PACKS-DATA':
        case 'packs/ADD-NEW-PACK':
        case 'packs/UPDATE-PACK':
            return {...state, ...action.data}
        case 'packs/DELETE-PACK':
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.id)}
        default:
            return state
    }
}

//actions

export const setPacksData = (data: PacksDataType) =>
    ({type: 'packs/SET-PACKS-DATA', data} as const)

export const addNewPack = (data: AddedPackType) =>
    ({type: 'packs/ADD-NEW-PACK', data} as const)

export const deletePack = (id: string) =>
    ({type: 'packs/DELETE-PACK', id} as const)

export const updatePack = (data: UpdatedPackType) =>
    ({type: 'packs/UPDATE-PACK', data} as const)

//thunks

export const getCardPacksTC = (value?: number[]): ThunkType => (dispatch, getState) => {
    const state = getState()
    let params: packsParamsType = {pageCount: 7}
        if(value) {
            params = {...params, min: value[0], max: value[1]}
        }
    if (state.cards.privatCards.value) {
        params = {...params, user_id: state.profile._id}
    }
    packsAPI.getPacks(params)
        .then(data => {
            dispatch(setPacksData(data))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

export const addCardPackTC = (data: AddedPackType): ThunkType => (dispatch) => {
    packsAPI.addPack(data)
        .then(data => {
            dispatch(addNewPack(data))
            dispatch(getCardPacksTC())
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

export const deleteCardPackTC = (id: string): ThunkType => (dispatch) => {
    packsAPI.deletePack(id)
        .then((data) => {
            // dispatch(deletePack(id))
            dispatch(getCardPacksTC())
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

export const updateCardPackTC = (data: UpdatedPackType): ThunkType =>
    (dispatch, setState) => {
   const state = setState()
    const value = [state.packs.minCardsCount, state.packs.maxCardsCount]
    packsAPI.updatePack(data)
        .then(() => {

            // dispatch(updatePack(data))
            dispatch(getCardPacksTC(value))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            alert(error);
            console.log('Error: ', {...e})
        })
}

//types
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>
export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path: string
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: Date
    updated: Date
    __v: number
}

type PacksDataType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setAppStatusAC>>
type ActionsType = ReturnType<typeof setPacksData>
    | ReturnType<typeof addNewPack>
    | ReturnType<typeof deletePack>
    | ReturnType<typeof updatePack>