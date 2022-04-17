import * as Keys from './_keys'
import flow from 'lodash/fp/flow'
import { ReduxDevTools } from './ReduxDevTools'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { createReducer } from './redux.utils'
import { shoppingCart } from '../types'
import { MERCH } from '../dummyData'

const rootReducer = combineReducers({
  [Keys.MERCHANDISE]: createReducer(Keys.MERCHANDISE, MERCH),
  [Keys.SHOPPING_CART]: createReducer(Keys.SHOPPING_CART, shoppingCart()),
  [Keys.SIDEBAR]: createReducer(Keys.SIDEBAR, true),
})

const middleware: [] = []

// ReduxDevTools
// CTRL-h to toggle redux devtools
// CTRL-g to reposition redux devtools

const enhancer = flow(
  ReduxDevTools.instrument(),
  applyMiddleware(...middleware)
)

export const store = createStore(rootReducer, {}, enhancer)
