export const GET_GLOBAL_DATA = 'GET_GLOBAL_DATA'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

export type GlobalData = {
    active_cryptocurrencies: number
    markets: number
    market_cap_change_percentage_24h_usd: number
    market_cap_percentage: {
        btc: number
        eth: number
    }
    total_market_cap: {
        btc: number
        eth: number
        usd: number
    }
    total_volume: {
        usd: number
    }

}

interface GetGlobalData {
    type: typeof GET_GLOBAL_DATA
    payload: GlobalData
}

interface SetLoading {
    type: typeof SET_LOADING
}

interface SetError {
    type: typeof SET_ERROR
}

export type GlobalDataAction = GetGlobalData | SetLoading | SetError