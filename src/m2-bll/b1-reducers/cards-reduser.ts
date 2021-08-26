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
const SET_SEARCH_BY_QUESTION_QUERY = 'cards/SET-SEARCH-BY-QUESTION-QUERY'
const SET_SEARCH_BY_ANSWER_QUERY = 'cards/SET-SEARCH-BY-ANSWER-QUERY'
const SET_PAGE = 'cards/SET-PAGE'
const SET_PAGE_COUNT = 'cards/SET-PAGE-COUNT'


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
    SearchByQuestionQuery: "",
    SearchByAnswerQuery: "",
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
        case SET_SEARCH_BY_QUESTION_QUERY:
            return {
                ...state,
                SearchByQuestionQuery: action.value
            }
        case SET_SEARCH_BY_ANSWER_QUERY:
            return {
                ...state,
                SearchByAnswerQuery: action.value
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
        case SET_PAGE:
            return {...state, page: action.page}
        case SET_PAGE_COUNT:
            return {...state, pageCount: action.PageCount}
        case SET_SORT_VALUE:
            return {...state, sort: action.value}
        default:
            return state
    }
}

export const getCardsAC = (cards: ResponseGetCardsType) => ({type: SET_CARDS, cards} as const)
export const onChangePrivateAC = (value: boolean) => ({type: ON_CHANGE_PRIVATE, value} as const)
export const updateCardGradeAC = (data: updatedGradeType) => ({type: UPDATE_CARD_GRADE, data} as const)

//search actions
export const setSearchByQuestionQuery = (value: string) =>
    ({type: SET_SEARCH_BY_QUESTION_QUERY, value} as const)

export const setSearchByAnswerQuery = (value: string) =>
    ({type: SET_SEARCH_BY_ANSWER_QUERY, value} as const)

//pagination actions
export const setCardsPage = (page: number) =>
    ({type: 'cards/SET-PAGE', page} as const)

export const setCardsPageCount = (PageCount: number) =>
    ({type: 'cards/SET-PAGE-COUNT', PageCount} as const)

//sort action
export const setCardsSortValue = (value: boolean) =>
    ({type: SET_SORT_VALUE, value} as const)

// thunk
export const getCardsTC = (cardsPackId: string): ThunkType => async (dispatch: Dispatch, getState) => {
    try {
        const state = getState();

        const params: cardsParamsType = {
            page: state.cards.page,
            pageCount: state.cards.pageCount,
            cardsPack_id: cardsPackId,
            sortCards: +state.cards.sort + "grade",
            cardAnswer: state.cards.SearchByAnswerQuery,
            cardQuestion: state.cards.SearchByQuestionQuery,
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
        await cardsApi.postCard(postCard)

        await dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const deleteCardsTC = (cardsPackId: string, id: string): ThunkType => async (dispatch) => {

    try {
        await cardsApi.deleteCard(id)

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
        await cardsApi.updateCard(updateCard)

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
    | ReturnType<typeof setSearchByQuestionQuery>
    | ReturnType<typeof setSearchByAnswerQuery>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionType>