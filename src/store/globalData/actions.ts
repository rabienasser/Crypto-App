import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import {GET_GLOBAL_DATA, SET_GLOBAL_LOADING, SET_ERROR, GET_BTC, GET_ETH, GlobalDataAction} from './types'

export const getGlobalData = (): ThunkAction<void, RootState, null, GlobalDataAction> => async (dispatch) => {
    try {
        dispatch({ type: SET_GLOBAL_LOADING })

        dispatch(getBTC())
        dispatch(getETH())
    
        const res = await fetch(`https://api.coingecko.com/api/v3/global`)

        const { data } = await res.json() 

        dispatch({
            type: GET_GLOBAL_DATA,
            payload: data
        })

    } catch(err) {
        dispatch({type: SET_ERROR})
    }
}

 const getBTC = (): ThunkAction<void, RootState, null, GlobalDataAction> => async (dispatch) => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`)
        const coin = await res.json() 
        dispatch({
            type: GET_BTC,
            payload: coin.image.thumb
        })
}

const getETH = (): ThunkAction<void, RootState, null, GlobalDataAction> => async (dispatch) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
    const coin = await res.json() 
    dispatch({
        type: GET_ETH,
        payload: coin.image.thumb
    })
}