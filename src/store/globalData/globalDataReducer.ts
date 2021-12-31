import {GET_GLOBAL_DATA, SET_GLOBAL_LOADING, SET_ERROR, GlobalDataAction, GlobalData} from './types'


interface GlobalDataState {
    globalData?: GlobalData | null
    isLoading: boolean
    error: boolean
}

const initialState = {
    globalData: null,
    isLoading: false,
    error: false,
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
        default: return state
    }
}

export default globalDataReducer