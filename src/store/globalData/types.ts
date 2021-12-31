export const GET_GLOBAL_DATA = 'GET_GLOBAL_DATA'
export const SET_GLOBAL_LOADING = 'SET_GLOBAL_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const GET_BTC = 'GET_BTC'
export const GET_ETH = 'GET_ETH'

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
        gbp: number
        eur: number
        jpy: number
    }
    total_volume: {
        usd: number
        gbp: number
        eur: number
        jpy: number
    }

}

interface GetGlobalData {
    type: typeof GET_GLOBAL_DATA
    payload: GlobalData
}

interface GetBTC {
    type: typeof GET_BTC
    payload: string
}

interface GetETH {
    type: typeof GET_ETH
    payload: string
}

interface SetLoading {
    type: typeof SET_GLOBAL_LOADING
}

interface SetError {
    type: typeof SET_ERROR
}

export type GlobalDataAction = GetGlobalData | SetLoading | SetError | GetBTC | GetETH