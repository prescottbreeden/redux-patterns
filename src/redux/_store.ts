import * as Keys from './_keys'
import flow from 'lodash/fp/flow'
import { ReduxDevTools } from './ReduxDevTools'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { counterMiddleware } from './middleware/counter.middleware'
import { createReducer } from './redux.utils'

const rootReducer = combineReducers({
  [Keys.COUNTER_KEY]: createReducer(Keys.COUNTER_KEY, 0),
  [Keys.OPINION_KEY]: createReducer(Keys.OPINION_KEY, false),
})

const middleware: any = [counterMiddleware]

// ReduxDevTools
// CTRL-h to toggle redux devtools
// CTRL-g to reposition redux devtools

const enhancer = flow(
  ReduxDevTools.instrument(),
  applyMiddleware(...middleware)
)

export const store = createStore(rootReducer, {}, enhancer)
