import {instance} from "./auth-api";

export const packsAPI = {
    getPacks(params: packsParamsType) {
        return instance.get(`cards/pack`, {params}
        ).then(res => res.data)
    },
    addPack(data: AddedPackType) {
        return instance.post('cards/pack', {cardsPack: data}).then(res => res.data)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?${id}`).then(res => res.data)
    },
    updatePack(data: UpdatedPackType) {
        // const id = data._id
        return instance.put('cards/pack', {cardsPack: {...data}}).then(res => res.data)
    },
}

//types

export type UpdatedPackType = {
    _id: string
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type AddedPackType = {
    name: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type packsParamsType = {
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}