import {Dispatch} from "redux"
import {
    cardsApi,
    CardType,
    RequestPostCardType,
    RequestUpdateCard,
    ResponseGetCardsType
} from "../../m3-dal/api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store/redux-store";

const SET_CARDS = 'cards/SET-CARDS'
const ON_PACKS_TRUE = 'cards/ON_PACKS_TRUE'
const ON_CHANGE_PRIVATE = 'cards/ON-CHANGE_PRIVATE'
const ON_PRIVATE_CARDS = 'cards/ON-PRIVATE-CARDS'


const initialState = {
    currentPackData: {
        id: "",
        name: "",
    },
    cards: [{
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        rating: 0,
        shots: 0,
        type: 'card',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: '',
    }] as Array<CardType>,

    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    packsTrue: false,
    privatCards: false,
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            const copyState = {...state, ...action.cards}
            return copyState

        case ON_PACKS_TRUE:
            return {
                ...state,
                packsTrue: action.value
            }
        case ON_CHANGE_PRIVATE:
            return {
                ...state,
                privatCards: action.value
            }


        case "SET-CURRENT-PACK-ID":
            return {...state, currentPackData: action.data}
        default:
            return state
    }
}

export const getCardsAC = (cards: ResponseGetCardsType) => ({type: SET_CARDS, cards} as const)
export const onPacksTrueAC = (value: boolean) => ({type: ON_PACKS_TRUE, value} as const)
export const onChangePrivateAC = (value: boolean) => ({type: ON_CHANGE_PRIVATE, value} as const)

export const setCurrentPackDataAC = (data: { id: string, name: string }) => ({
    type: "SET-CURRENT-PACK-ID",
    data
} as const)


// thunk

export const getCardsTC = (cardsPackId: string) => async (dispatch: Dispatch) => {
    try {

        const data = await cardsApi.getCards(cardsPackId)
        dispatch(getCardsAC(data))
    } catch (e) {
        console.log('e:' + e)
    }
}
export const postCardsTC = (cardsPackId: string): ThunkType => async (dispatch) => {
    const postCard = {
        cardsPack_id: cardsPackId,
        answer: "TestAnswer",
        question: "TestQuestion"

    } as RequestPostCardType

    try {
        const data = await cardsApi.postCard(postCard)

        await dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const deleteCardsTC = (cardsPackId: string, id: string): ThunkType => async (dispatch) => {

    try {
        const data = await cardsApi.deleteCard(id)

        await dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const updateCardsTC = (cardsPackId: string, cardId: string): ThunkType => async (dispatch) => {
    const updateCard = {
        _id: cardId,
        answer: "-UpdatedTestAnswer-",
        question: "-UpdatedTestQuestion-"
    } as RequestUpdateCard
    try {
        const data = await cardsApi.updateCard(updateCard)

        await dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

type ActionType = ReturnType<typeof getCardsAC>
    | ReturnType<typeof onPacksTrueAC>
    | ReturnType<typeof onChangePrivateAC>
    | ReturnType<typeof setCurrentPackDataAC>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionType>