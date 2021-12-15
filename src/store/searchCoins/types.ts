export const SEARCH_COINS = 'GET_COINS'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

export type Coin = {
    name: string
}

export type Coins = Coin[]

interface SearchCoins {
    type: typeof SEARCH_COINS
    payload: Coins
}

interface SetLoading {
    type: typeof SET_LOADING
}

interface SetError {
    type: typeof SET_ERROR
}

export type SearchCoinsAction = SearchCoins | SetLoading | SetError