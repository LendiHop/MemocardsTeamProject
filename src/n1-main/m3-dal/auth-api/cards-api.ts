import {instance} from "./auth-api";


export const cardsApi = {
    getCards(packId: string) {
        return instance.get<ResponseGetCardsType>(`cards/card?cardsPack_id=${packId}`).then(res => res.data)
    },
    postCards(postCards: RequestPostCardType) {
        return instance.post<{ newCard: object }>('cards/card', {postCards}).then(res => res.data)
    },
    deleteCards(id: string) {
        return instance.delete(`cards/card?${id}`).then(res => res.data)
    },
    updateCards(card: RequestUpdateCard) {
        return instance.put<{ updateCard: object }>('cards/card', {card}).then(res => res.data)
    },
}
export const packsAPI = {
    getPacks() {
        return instance.get('cards/pack').then(res => res.data)
    }
}

//types

type CardsTypeType = 'card' | 'pack'

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: CardsTypeType
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type ResponseGetCardsType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type RequestPostCardType = {
    answer?: string
    question?: string
    cardsPack_id: string
    grade?: number
    rating?: number
    shots?: number
    type?: CardsTypeType
    answerImg?: string
    questionImg?: string
    answerVideo?: string
    questionVideo?: string

}
export type RequestUpdateCard = {
    _id: string
    question?: string // не обязательно
    answer?: string
    comments?: string // не обязателен

}
