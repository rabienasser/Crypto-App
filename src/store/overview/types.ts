export const SET_OVERVIEW_LOADING = 'SET_OVERVIEW_LOADING'
export const GET_OVERVIEW_DATA = 'SET_OVERVIEW_DATA'
export const SET_OVERVIEW_ERROR = 'SET_OVERVIEW_ERROR'
export const GET_COIN_PRICE = 'GET_COIN_PRICE'
export const CHANGE_DAYS = 'CHANGE_DAYS'
export const CHANGE_COIN = 'CHANGE_COIN'

export interface OverviewData {
    prices: number[][]
    total_volumes: number[][]
}

export interface CurrentPrice {
    usd: number
    gbp: number
    eur: number
    jpy: number
}

export type Prices = OverviewData

export type CurrencyPrices = CurrentPrice

interface SetOverviewLoading {
    type: typeof SET_OVERVIEW_LOADING
}

interface GetOverviewData {
    type: typeof GET_OVERVIEW_DATA
    payload: Prices
}

interface SetOverviewError {
    type: typeof SET_OVERVIEW_ERROR
}

interface GetCoinPrice {
    type: typeof GET_COIN_PRICE
    payload: CurrencyPrices
}

interface ChangeDays {
    type: typeof CHANGE_DAYS
    payload: number
}

interface ChangeCoin {
    type: typeof CHANGE_COIN
    payload: string
}

export type OverviewDataAction = SetOverviewLoading | GetOverviewData | SetOverviewError | GetCoinPrice | ChangeDays | ChangeCoin