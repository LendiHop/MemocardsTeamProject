import {Dispatch} from "redux"
import {cardsAPI, packsAPI} from "../../m3-dal/auth-api/cards-a-p-i";

const GET_CARDS = 'Cards/GET-CARDS'
const POST_CARDS = 'Cards/POST-CARDS'
const UPDATE_CARDS = 'Cards/UPDATE-CARDS'
const DELETE_CARDS = 'Cards/DELETE-CARDS'

const initialState = {
    cards: {
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
    },
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    return state
}

export const getCardsAC = (cards: InitialStateType) => ({type: GET_CARDS, cards} as const)


// thunk

export const getCardsTC = (cardsPackId: string) => async (dispatch: Dispatch) => {

    try {
        debugger
        const data = await cardsAPI.getCards(cardsPackId)
        console.log('data:' + data)
    } catch (e) {
        console.log('e:' + e)
    }
}
export const getPacksTC = () => async (dispatch: Dispatch) => {

    try {
        debugger
        const data = await packsAPI.getPacks()
        console.log('data:' + data)
    } catch (e) {
        console.log('e:' + e)
    }
}
