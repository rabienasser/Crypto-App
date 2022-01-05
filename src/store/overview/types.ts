export const SET_OVERVIEW_LOADING = 'SET_OVERVIEW_LOADING'
export const GET_OVERVIEW_DATA = 'SET_OVERVIEW_DATA'
export const SET_OVERVIEW_ERROR = 'SET_OVERVIEW_ERROR'
export const GET_COIN_MARKET_DATA = 'GET_COIN_MARKET_DATA'
export const CHANGE_DAYS = 'CHANGE_DAYS'
export const CHANGE_COIN = 'CHANGE_COIN'

export interface OverviewData {
    prices: number[][]
    total_volumes: number[][]
}

export interface Currencies {
    usd: number
    gbp: number
    eur: number
    jpy: number
}

export interface MarketDataInterface {
    current_price: Currencies
    total_volume: Currencies
}

export type Prices = OverviewData

export type MarketData = MarketDataInterface

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

interface GetCoinMarketData {
    type: typeof GET_COIN_MARKET_DATA
    payload: MarketData
}

interface ChangeDays {
    type: typeof CHANGE_DAYS
    payload: number
}

interface ChangeCoin {
    type: typeof CHANGE_COIN
    payload: string
}

export type OverviewDataAction = SetOverviewLoading | GetOverviewData | SetOverviewError | GetCoinMarketData | ChangeDays | ChangeCoin