import {SEARCH_COINS, SET_LOADING, SET_ERROR, SearchCoinsAction, Coins} from './types'

interface CoinState {
    coins?: Coins | null
    // isLoading: boolean
    error: boolean
}

const initialState = {
    coins: null,
    // isLoading: false,
    error: false,
}

const searchCoinsReducer = (state: CoinState = initialState, action: SearchCoinsAction) => {
    switch(action.type) {
        // case SET_LOADING:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        case SEARCH_COINS:
            return {
                ...state,
                isLoading: false,
                coins: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default: return state
    }
}

export default searchCoinsReducer