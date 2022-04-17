import cond from 'lodash/fp/cond'
import curry from 'lodash/fp/curry'
import eq from 'lodash/fp/eq'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import otherwise from 'lodash/fp/stubTrue'
import { Functor, ReduxAction } from '../types'

// it doesn't quack unfortunately
const DuxBox = <T>(value: T) => ({
  value,
  fold: (f: Function) => f(value),
  map: (f: (a: T) => T) => DuxBox(f(value)),
  of: (newValue: T) => DuxBox(newValue),
})

export const identity = <A>(A: A) => A
export const fold =
  <A, B>(f: (a: A) => B) =>
  (x: Functor<A>) =>
    x.fold<B>(f)
export const read =
  <A>(key: string) =>
  (reduxState: { [key: string]: Functor<A> }) =>
    fold<A, A>(identity)(reduxState[key])

// action factory
const actionType = curry((key: string, type: string) => `${key} 🚀 ${type}`)
const setAction = (key: string) => actionType(key, 'SET')
const mapAction = (key: string) => actionType(key, 'MAP')

export const action =
  <T>(key: string, meta?: string) =>
  (payload: T | ((a: T) => T)) =>
    typeof payload === 'function'
      ? { type: mapAction(key), payload, meta }
      : { type: setAction(key), payload, meta }

// action predicates
const shouldMap = (key: string) => flow(get('type'), eq(mapAction(key)))
const shouldSet = (key: string) => flow(get('type'), eq(setAction(key)))

// state transformation
const mapState =
  <T>(state: Functor<T>) =>
  ({ payload }: ReduxAction<T>) => {
    return state.map(payload)
  }
const setState =
  <T>(state: Functor<T>) =>
  ({ payload }: ReduxAction<T>) => {
    return state.of(payload as any) // hate you typescript
  }

// one reducer to rule them all and in the darkness bind them
export const createReducer =
  <T>(key: string, initial: T) =>
  (currentState: Functor<T>, action: ReduxAction<T>) => {
    const state = currentState ?? DuxBox(initial)
    return cond([
      [shouldMap(key), mapState(state)],
      [shouldSet(key), setState(state)],
      [otherwise, () => state],
    ])(action)
  }
