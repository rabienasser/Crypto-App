import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { SET_OVERVIEW_LOADING, GET_OVERVIEW_DATA, SET_OVERVIEW_ERROR, GET_COIN_PRICE, CHANGE_DAYS, CHANGE_COIN, OverviewDataAction } from "./types";

export const getOverviewChartData = (): ThunkAction<void, RootState, null, OverviewDataAction> => async (dispatch, getState) => {
    try {
        const state = getState()
        const { currency } = state.coinList
        const { id, days } = state.overview

        dispatch({ type: SET_OVERVIEW_LOADING })

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`)

        const data = await res.json()

        dispatch(getCoinPrice())
        dispatch({
            type: GET_OVERVIEW_DATA,
            payload: data.prices
        })

    } catch(err) {
        dispatch({type: SET_OVERVIEW_ERROR})
    }
}

export const getCoinPrice = (): ThunkAction<void, RootState, null, OverviewDataAction> => async (dispatch, getState) => {
        const state = getState()
        const { id, error } = state.overview

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        if(!error){
            const { market_data: { current_price } } = await res.json()
            dispatch({
                type: GET_COIN_PRICE,
                payload: current_price
            })
        }
}

export const changeDays = (days: number) => {
    return {
        type: CHANGE_DAYS,
        payload: days
    }
}

export const changeCoin = (id: string) => {
    return {
        type: CHANGE_COIN,
        payload: id
    }
}