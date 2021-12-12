import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import coinListReducer from './coinList/coinListReducer'
import globalDataReducer from './globalData/globalDataReducer'

const rootReducer = combineReducers({
    coinList: coinListReducer,
    globalData: globalDataReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export default store;