import { SET_OVERVIEW_LOADING, GET_OVERVIEW_DATA, SET_OVERVIEW_ERROR, GET_COIN_PRICE, CHANGE_DAYS, CHANGE_COIN, OverviewDataAction, CurrencyPrices, Prices } from './types'

interface OverviewState {
    data?: Prices | null
    isLoading: boolean
    error: boolean
    id: string
    days: number
    prices: null | CurrencyPrices
}

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    id: 'bitcoin',
    days: 30,
    prices: null
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
                data: action.payload
            }
        case SET_OVERVIEW_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case GET_COIN_PRICE:
            return {
                ...state,
                prices: action.payload
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