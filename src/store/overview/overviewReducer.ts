import { SET_OVERVIEW_LOADING, GET_OVERVIEW_DATA, SET_OVERVIEW_ERROR, GET_COIN_MARKET_DATA, CHANGE_DAYS, CHANGE_COIN, OverviewDataAction, MarketData, Prices } from './types'

interface OverviewState {
    data?: Prices | null
    isLoading: boolean
    error: boolean
    id: string
    days: number
    marketData: null | MarketData
}

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    id: 'bitcoin',
    days: 30,
    marketData: null
}

const overviewReducer = (state: OverviewState = initialState, action: OverviewDataAction): OverviewState => {
    switch(action.type) {
        case SET_OVERVIEW_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_OVERVIEW_DATA:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: false,
            }
        case SET_OVERVIEW_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case GET_COIN_MARKET_DATA:
            return {
                ...state,
                marketData: action.payload
            }
        case CHANGE_DAYS:
            return {
                ...state,
                days: action.payload
            }
        case CHANGE_COIN:
            return {
                ...state,
                id: action.payload
            }
        default: return state
    }
}

export default overviewReducer