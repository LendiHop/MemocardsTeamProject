import {Dispatch} from "redux"
import {
    cardsApi,
    CardType,
    RequestPostCardType,
    RequestUpdateCard,
    ResponseGetCardsType, updatedGradeType
} from "../../m3-dal/api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store/redux-store";
import {setAppStatusAC} from "./app-reduser";

const SET_CARDS = 'cards/SET-CARDS'
const ON_PACKS_TRUE = 'cards/ON_PACKS_TRUE'
const ON_CHANGE_PRIVATE = 'cards/ON-CHANGE_PRIVATE'
const UPDATE_CARD_GRADE = 'cards/UPDATE_CARD_GRADE'


const initialState = {
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
    privatCards: {value: false},
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
                privatCards: {...state.privatCards, value: action.value}
            }
        case UPDATE_CARD_GRADE:
            const {card_id, grade, shots} = action.data;
            return {
                ...state,
                cards: state.cards.map(card => {
                    if (card._id === card_id) {
                        card.grade = grade;
                        card.shots = shots;
                    }
                    return card;
                })
            }
        default:
            return state
    }
}

export const getCardsAC = (cards: ResponseGetCardsType) => ({type: SET_CARDS, cards} as const)
export const onPacksTrueAC = (value: boolean) => ({type: ON_PACKS_TRUE, value} as const)
export const onChangePrivateAC = (value: boolean) => ({type: ON_CHANGE_PRIVATE, value} as const)
export const updateCardGradeAC = (data: updatedGradeType) => ({type: UPDATE_CARD_GRADE, data} as const)

// thunk

export const getCardsTC = (cardsPackId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await cardsApi.getCards(cardsPackId)
        dispatch(getCardsAC(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        console.log('e:' + e)
    }
}
export const postCardsTC = (cardsPackId: string, question: string, answer: string): ThunkType => async (dispatch) => {
    const postCard = {
        cardsPack_id: cardsPackId,
        answer: answer,
        question: question

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

export const updateCardsTC = (cardsPackId: string, cardId: string,question: string, answer: string,): ThunkType => async (dispatch) => {
    const updateCard = {
        _id: cardId,
        answer: answer,
        question: question
    } as RequestUpdateCard
    try {
        const data = await cardsApi.updateCard(updateCard)

        await dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const updateGradeTC = (cardId: string, grade: number) => async (dispatch: Dispatch) => {
    try {
        const data = await cardsApi.updateGrade(grade, cardId)
        dispatch(updateCardGradeAC(data))

    } catch (e) {
        console.log('e:' + e)
    }
}

type ActionType = ReturnType<typeof getCardsAC>
    | ReturnType<typeof onPacksTrueAC>
    | ReturnType<typeof onChangePrivateAC>
    | ReturnType<typeof updateCardGradeAC>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionType>