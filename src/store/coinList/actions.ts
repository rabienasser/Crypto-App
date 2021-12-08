import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { SET_BOTTOM_OR_TOP_COINS, GET_COINS_BY_MARKET_CAP, GET_COINS_BY_VOLUME, SET_LOADING, SET_ERROR, SORT_PRICE, SORT_NAME, SORT_1_HOUR, SORT_24_HOUR, SORT_7_DAY, CHANGE_PAGE, CHANGE_PER_PAGE, CoinListAction, CoinList } from "./types";


export const getCoinsByMarketCap = (top: boolean): ThunkAction<void, RootState, null, CoinListAction> => async (dispatch, getState) => {
    const state = getState()
    const { page, perPage } = state.coinList
    
    try {
        dispatch({ type: SET_LOADING })

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${top ? 'market_cap_desc' : 'market_cap_asc'}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)

        const coinListData: CoinList = await res.json() 

        dispatch({
            type: GET_COINS_BY_MARKET_CAP,
            payload: coinListData
        })
    } catch(err) {
        dispatch({ 
            type: SET_ERROR,
            payload: err
         })
    }
}

export const getCoinsByVolume = (top: boolean): ThunkAction<void, RootState, null, CoinListAction> => async (dispatch, getState) => {
    const state = getState()
    const { page, perPage } = state.coinList
    
    try {
        dispatch({ type: SET_LOADING })

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${top ? 'volume_desc' : 'volume_asc'}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`)

        const coinListData: CoinList = await res.json() 

        dispatch({
            type: GET_COINS_BY_VOLUME,
            payload: coinListData
        })
    } catch(err) {
        dispatch({ 
            type: SET_ERROR,
            payload: err
         })
    }
}

export const setBottomOrTopCoins = () => {
    return {
        type: SET_BOTTOM_OR_TOP_COINS
    }
}

export const sortPrice = () => {
    return {
        type: SORT_PRICE
    }
}

export const sortName = () => {
    return {
        type: SORT_NAME
    }
}

export const sort1Hour = () => {
    return {
        type: SORT_1_HOUR
    }
}

export const sort24Hour = () => {
    return {
        type: SORT_24_HOUR
    }
}

export const sort7Day = () => {
    return {
        type: SORT_7_DAY
    }
}

export const changePage = (bool: boolean) => {
    return {
        type: CHANGE_PAGE,
        payload: bool
    }
}

export const changePerPage = (number: number) => {
    return {
        type: CHANGE_PER_PAGE,
        payload: number
    }
}