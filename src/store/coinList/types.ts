export const GET_COINS_BY_MARKET_CAP = 'GET_COINS_BY_MARKET_CAP'
export const GET_COINS_BY_VOLUME = 'GET_COINS_BY_VOLUME'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SORT_PRICE = 'SORT_PRICE'
export const SORT_NAME = 'SORT_NAME'


export interface Coin {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number,
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi: any,
    last_updated: string
    sparkline_in_7d: {
        price: number[]
    }
    price_change_percentage_1h_in_currency: number
    price_change_percentage_24h_in_currency: number
    price_change_percentage_7d_in_currency: number
}

export type CoinList = Coin[]

interface GetCoinsByMarketCap {
    type: typeof GET_COINS_BY_MARKET_CAP
    payload: CoinList
}

interface GetCoinsByVolume {
    type: typeof GET_COINS_BY_VOLUME
    payload: CoinList
}

interface SetLoading {
    type: typeof SET_LOADING
}

interface SetError {
    type: typeof SET_ERROR
    payload: any
}

interface SortPrice {
    type: typeof SORT_PRICE
}

interface SortName {
    type: typeof SORT_NAME
}

export type CoinListAction = GetCoinsByMarketCap | GetCoinsByVolume | SetLoading | SetError | SortPrice | SortName