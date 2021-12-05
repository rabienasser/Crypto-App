import { CoinList, CoinListAction, Coin, SET_BOTTOM_OR_TOP_COINS, GET_COINS_BY_MARKET_CAP, GET_COINS_BY_VOLUME, SET_ERROR, SET_LOADING, SORT_PRICE, SORT_NAME, SORT_1_HOUR, SORT_24_HOUR, SORT_7_DAY, CHANGE_PAGE } from './types'

interface CoinListState {
    data?: CoinList | null 
    isLoading: boolean
    error: boolean,
    sorted: boolean,
    marketCap: boolean,
    top: boolean,
    page: number
}

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    sorted: true,
    marketCap: true,
    top: true,
    page: 1
}

const coinListReducer = (state: CoinListState = initialState, action: CoinListAction): CoinListState => {
    let sortedData: CoinList;

    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case GET_COINS_BY_MARKET_CAP:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                marketCap: true
            }
        case GET_COINS_BY_VOLUME:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                marketCap: false
            }
        case SET_BOTTOM_OR_TOP_COINS:
            return {
                ...state,
                top: !state.top
            }
        case SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case SORT_PRICE:
            if (state.sorted){
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => a.current_price - b.current_price)
            } else {
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => b.current_price - a.current_price)
            }
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_NAME:
            if (state.sorted){
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => a.name.localeCompare(b.name))
            } else {
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_1_HOUR:
            if (state.sorted){
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency)
            } else {
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency)
            }
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_24_HOUR:
            if (state.sorted){
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency)
            } else {
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency)
            }
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_7_DAY:
            if (state.sorted){
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency)
            } else {
                sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency)
            }
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload ? state.page + 1 : state.page === 1 ? state.page = 1 : state.page - 1
            }
        default: return state
    }
}

export default coinListReducer