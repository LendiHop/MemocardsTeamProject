import {AddedPackType, packsAPI, packsParamsType, UpdatedPackType} from "../../m3-dal/packs-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reduser";
import {AppRootStateType} from "../b0-store/redux-store";
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
    cardPacksTotalCount: 14, // количество колод
    maxCardsCount: 103, //constant max value of cards
    minCardsCount: 0, //constant min value of cards

    min: 0,
    max: 100,

    page: 1, // выбранная страница
    searchQuery: "",
    sort: false,
    pageCount: 10, // количество элементов на странице
}

export const packsReducer = (state: PacksDataType = initialState, action: ActionsType): PacksDataType => {
    switch (action.type) {
        case 'packs/SET-PACKS-DATA':
        case 'packs/ADD-NEW-PACK':
        case 'packs/UPDATE-PACK':
            return {...state, ...action.data}
        case 'packs/DELETE-PACK':
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.id)}
        case 'packs/SET-PAGE':
            return {...state, page: action.page}
        case 'packs/SET-PAGE-COUNT':
            return {...state, pageCount: action.PageCount}
        case 'packs/SET-MIN-MAX-VALUES':
            return {...state, min: action.min, max: action.max}
        case 'packs/SET-SEARCH-QUERY':
            return {...state, searchQuery: action.value}
        case 'packs/SET-SORT-VALUE':
            return {...state, sort: action.value}
        default:
            return state
    }
}

//slider action

export const setMinMaxValues = (values: number[]) =>
    ({type: 'packs/SET-MIN-MAX-VALUES', min: values[0], max: values[1]} as const)

//sort action

export const setPacksSortValue = (value: boolean) =>
    ({type: 'packs/SET-SORT-VALUE', value} as const)

//search action

export const setSearchQuery = (value: string) =>
    ({type: 'packs/SET-SEARCH-QUERY', value} as const)

//pagination actions

export const setPage = (page: number) =>
    ({type: 'packs/SET-PAGE', page} as const)

export const setPageCount = (PageCount: number) =>
    ({type: 'packs/SET-PAGE-COUNT', PageCount} as const)

//packs actions

export const setPacksData = (data: PacksDataType) =>
    ({type: 'packs/SET-PACKS-DATA', data} as const)

export const addNewPack = (data: AddedPackType) =>
    ({type: 'packs/ADD-NEW-PACK', data} as const)

export const deletePack = (id: string) =>
    ({type: 'packs/DELETE-PACK', id} as const)

export const updatePack = (data: UpdatedPackType) =>
    ({type: 'packs/UPDATE-PACK', data} as const)

//thunks

export const getCardPacksTC = (): ThunkType => (dispatch, getState) => {
    const state = getState()

    let params: packsParamsType = {
        packName: state.packs.searchQuery,
        min: state.packs.min,
        max: state.packs.max,
        page: state.packs.page,
        pageCount: state.packs.pageCount,
        sortPacks: +state.packs.sort + "updated",
    }

    if (state.cards.privatCards) {
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
            dispatch(deletePack(id))
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


    packsAPI.updatePack(data)
        .then(() => {
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
    min: number
    max: number
    searchQuery: string
    sort: boolean
}

type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof setAppStatusAC>>
type ActionsType = ReturnType<typeof setPacksData>
    | ReturnType<typeof addNewPack>
    | ReturnType<typeof deletePack>
    | ReturnType<typeof updatePack>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setMinMaxValues>
    | ReturnType<typeof setSearchQuery>
    | ReturnType<typeof setPacksSortValue>