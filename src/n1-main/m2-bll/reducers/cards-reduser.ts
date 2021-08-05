import {Dispatch} from "redux"
import {cardsApi, CardType, packsAPI, RequestPostCardType, RequestUpdateCard, ResponseGetCardsType} from "../../m3-dal/auth-api/cards-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/redux-store";

const GET_CARDS = 'Cards/GET-CARDS'


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
    } ] as Array<CardType>,

    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    packsTrue: true,
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "Cards/GET-CARDS":
            const copyState = {...state, cards: {...state.cards}}
            return {
                ...copyState,
                ...action.cards

            }

        default:
                return state
    }
}

export const getCardsAC = (cards: ResponseGetCardsType) => ({type: GET_CARDS, cards} as const)


// thunk

export const getCardsTC = (cardsPackId: string) => async (dispatch: Dispatch) => {

    try {
        const data = await cardsApi.getCards(cardsPackId)
        dispatch(getCardsAC(data))
    } catch (e) {
        console.log('e:' + e)
    }
}
export const postCardsTC = (cardsPackId: string):ThunkAction<void, AppRootStateType, unknown,  ActionType> => async (dispatch) => {
    const postCard = {} as RequestPostCardType
    try {
        const data = await cardsApi.postCards(postCard)

        dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const deleteCardsTC = (cardsPackId: string, id: string):ThunkAction<void, AppRootStateType, unknown,  ActionType> => async (dispatch) => {

    try {
        const data = await cardsApi.deleteCards(id)

        dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}

export const updateCardsTC = (cardsPackId: string, cardId: string):ThunkAction<void, AppRootStateType, unknown,  ActionType> => async (dispatch) => {
    const updateCard = {_id: cardId} as RequestUpdateCard
    try {
        const data = await cardsApi.updateCards(updateCard)

        dispatch(getCardsTC(cardsPackId))
    } catch (e) {
        console.log('e:' + e)
    }
}



export const getPacksTC = () => async (dispatch: Dispatch) => {

    try {
        const data = await packsAPI.getPacks()
        console.log('data:' + data)
    } catch (e) {
        console.log('e:' + e)
    }
}

type ActionType = ReturnType<typeof getCardsAC>
