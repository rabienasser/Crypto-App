import { RootState } from 'store';
import { CoinList, CoinListAction, Coin, SET_BOTTOM_OR_TOP_COINS, GET_COINS_BY_MARKET_CAP, GET_COINS_BY_VOLUME, SET_ERROR, SET_LOADING, SORT_PRICE, SORT_NAME, SORT_1_HOUR, SORT_24_HOUR, SORT_7_DAY, CHANGE_PAGE, CHANGE_PER_PAGE, CHANGE_CURRENCY } from './types'

interface CoinListState {
    data?: CoinList | null 
    isLoading: boolean
    error: boolean,
    sorted: boolean,
    marketCap: boolean,
    top: boolean,
    page: number,
    perPage: number
    currency: string
}

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    sorted: true,
    marketCap: true,
    top: true,
    page: 1,
    perPage: 50,
    currency: 'usd'
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
             sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => {
                if(state.sorted){
                    return  a.current_price - b.current_price
                } else {
                   return b.current_price - a.current_price
                }
            })
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_NAME:
            sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => {
                if(state.sorted) {
                    return a.name.localeCompare(b.name)
                } else {
                    return b.name.localeCompare(a.name)
                }
            })
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_1_HOUR:
            sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => {
                if(state.sorted){
                    return  a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency
                } else {
                   return b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency
                }
            })
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_24_HOUR:
            sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => {
                if(state.sorted){
                    return  a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency
                } else {
                   return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency
                }
            })
            return {
                ...state,
                sorted: !state.sorted,
                data: sortedData
            }
        case SORT_7_DAY:
            sortedData = [...state.data!]?.sort((a: Coin, b: Coin) => {
                if(state.sorted){
                    return  a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency
                } else {
                   return b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency
                }
            })
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
        case CHANGE_PER_PAGE:
            return {
                ...state,
                perPage: action.payload
            }
            case CHANGE_CURRENCY:
                return {
                    ...state,
                    currency: action.payload
                }
        default: return state
    }
}

export const getIsAppLoading = (state: RootState) =>
state.coinList.isLoading || state.globalData.isLoading;

export const btc = (state: RootState) => {
    return state.coinList.data?.find(coin => coin.id === 'bitcoin')
}

export const eth = (state: RootState) => {
    return state.coinList.data?.find(coin => coin.id === 'ethereum')
}

export default coinListReducer