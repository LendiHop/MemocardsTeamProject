import { instance } from "./auth-api"

export const cardsApi = {
    getCards(params: cardsParamsType) {
        return instance.get<ResponseGetCardsType>("cards/card", {params}).then(res => res.data)
    },
    postCard(card: RequestPostCardType) {
        return instance.post<{ newCard: object }>('cards/card', {card}).then(res => res.data)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`).then(res => res.data)
    },
    updateCard(card: RequestUpdateCard) {
        return instance.put<{ updateCard: object }>('cards/card', {card}).then(res => res.data)
    },
    updateGrade(grade: number, card_id: string) {
        return instance.put<updatedGradeType>('cards/grade', {grade, card_id}).then(res => res.data)
    },
}

//types

type CardsTypeType = 'card' | 'pack' | ''

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: CardsTypeType
    more_id: string
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

export type updatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
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

export type cardsParamsType = {
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
}
