import {GET_GLOBAL_DATA, SET_GLOBAL_LOADING, SET_ERROR, GET_BTC, GET_ETH, GlobalDataAction, GlobalData} from './types'


interface GlobalDataState {
    globalData?: GlobalData | null
    isLoading: boolean
    error: boolean
    btc: string
    eth: string
}

const initialState = {
    globalData: null,
    isLoading: false,
    error: false,
    btc: '',
    eth: ''
}

const globalDataReducer = (state: GlobalDataState = initialState, action: GlobalDataAction) => {
    switch(action.type) {
        case SET_GLOBAL_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_GLOBAL_DATA:
            return {
                ...state,
                isLoading: false,
                globalData: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case GET_BTC:
            return {
                ...state,
                btc: action.payload
            }
            case GET_ETH:
            return {
                ...state,
                eth: action.payload
            }
        default: return state
    }
}

export default globalDataReducer