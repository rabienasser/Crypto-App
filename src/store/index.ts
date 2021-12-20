import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import coinListReducer from './coinList/coinListReducer'
import globalDataReducer from './globalData/globalDataReducer'
import searchCoinsReducer from './searchCoins/searchCoinsReducer'

const rootReducer = combineReducers({
    coinList: coinListReducer,
    globalData: globalDataReducer,
    searchCoins: searchCoinsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export default store;