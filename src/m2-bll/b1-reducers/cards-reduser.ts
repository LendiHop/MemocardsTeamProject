import {Dispatch} from "redux"
import {
    cardsApi, cardsParamsType,
    CardType,
    RequestPostCardType,
    RequestUpdateCard,
    ResponseGetCardsType, updatedGradeType
} from "../../m3-dal/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../b0-store/redux-store";
import {setAppStatusAC} from "./app-reduser";

const SET_CARDS = 'cards/SET-CARDS'
const ON_CHANGE_PRIVATE = 'cards/ON-CHANGE_PRIVATE'
const UPDATE_CARD_GRADE = 'cards/UPDATE_CARD_GRADE'
const SET_SORT_VALUE = 'cards/SET-SORT-VALUE'


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
    privatCards: false,
    sort: false,
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.cards}
        case ON_CHANGE_PRIVATE:
            return {
                ...state,
                privatCards: action.value
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
        case SET_SORT_VALUE:
            return {...state, sort: action.value}
        default:
            return state
    }
}

export const getCardsAC = (cards: ResponseGetCardsType) => ({type: SET_CARDS, cards} as const)
export const onChangePrivateAC = (value: boolean) => ({type: ON_CHANGE_PRIVATE, value} as const)
export const updateCardGradeAC = (data: updatedGradeType) => ({type: UPDATE_CARD_GRADE, data} as const)

//sort action
export const setCardsSortValue = (value: boolean) =>
    ({type: SET_SORT_VALUE, value} as const)

// thunk

export const getCardsTC = (cardsPackId: string): ThunkType => async (dispatch: Dispatch, getState) => {
    try {
        const state = getState();

        const params: cardsParamsType = {
            // min: state.cards.min,
            // max: state.packs.max,
            // page: state.packs.page,
            // pageCount: state.packs.pageCount,
            cardsPack_id: cardsPackId,
            sortCards: +state.cards.sort + "grade",
        };

        dispatch(setAppStatusAC('loading'))
        const data = await cardsApi.getCards(params)
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
    | ReturnType<typeof onChangePrivateAC>
    | ReturnType<typeof updateCardGradeAC>
    | ReturnType<typeof setCardsSortValue>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionType>