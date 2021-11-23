import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { GET_COINS_BY_MARKET_CAP, GET_COINS_BY_VOLUME, SET_LOADING, SET_ERROR, SORT_PRICE, SORT_NAME, CoinListAction, CoinList } from "./types";

export const getCoinsByMarketCap = (): ThunkAction<void, RootState, null, CoinListAction> => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING })

        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d')

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

export const getCoinsByVolume = (): ThunkAction<void, RootState, null, CoinListAction> => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING })

        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d')

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
