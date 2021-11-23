import { CoinList, CoinListAction, Coin, GET_COINS_BY_MARKET_CAP, GET_COINS_BY_VOLUME, SET_ERROR, SET_LOADING, SORT_PRICE, SORT_NAME } from './types'

interface CoinListState {
    data?: CoinList | null
    isLoading: boolean
    error: boolean,
    sorted: boolean,
    marketCap: boolean
}

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    sorted: true,
    marketCap: true
}

const coinListReducer = (state: CoinListState = initialState, action: CoinListAction): CoinListState => {
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
        case SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case SORT_PRICE:
            return {
                ...state,
                sorted: !state.sorted,
                data: state.sorted ? state.data?.sort((a: Coin, b: Coin) => a.current_price - b.current_price) : state.data?.sort((a: Coin, b: Coin) => b.current_price - a.current_price)
            }
        case SORT_NAME:
            return {
                ...state,
                sorted: !state.sorted,
                data: state.sorted ? state.data?.sort((a: Coin, b: Coin) => a.name.localeCompare(b.name)) : state.data?.sort((a: Coin, b: Coin) => b.name.localeCompare(a.name))
            }
        default: return state
    }
}

export default coinListReducer