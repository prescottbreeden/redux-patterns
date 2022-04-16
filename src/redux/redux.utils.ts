import identity from 'lodash/identity'
import cond from 'lodash/fp/cond'
import curry from 'lodash/fp/curry'
import eq from 'lodash/fp/eq'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import otherwise from 'lodash/fp/stubTrue'
import {Functor, ReduxAction} from '../types'

// it doesn't quack unfortunately
const DuxBox = <T>(value: T) => ({
  value,
  fold: (f: Function) => f(value),
  map: (f: (a: T) => T) => DuxBox(f(value)),
  of: (newValue: T) => DuxBox(newValue)
})

export const fold = (f: Function) => (x: Functor<any>) => x.fold(f)
export const read = (key: string) => flow(get(key), fold(identity))

// action factory
const buildAction = curry((key: string, type: string) => `${key} 🚀 ${type}`)
const setAction = (key: string) => buildAction(key, 'SET')
const mapAction = (key: string) => buildAction(key, 'MAP')

// action predicates
const shouldMap = (key: string) => flow(get('type'), eq(mapAction(key)))
const shouldSet = (key: string) => flow(get('type'), eq(setAction(key)))

// state transformation
const mapState =
  <T>(state: Functor<T>) =>
  ({ payload }: ReduxAction<T>) =>  {
  return state.map(payload)
}
const setState =
  <T>(state: Functor<T>) =>
  ({ payload }: ReduxAction<T>) =>  {
  return state.of(payload as any) // hate you typescript
}

// one reducer to rule them all and in the darkness bind them
export const createReducer =
  <T>(key: string, initial: T) =>
  (currentState: Functor<T>, action: any) => {
  const state = currentState ?? DuxBox(initial)
  return cond([
    [shouldMap(key), mapState(state)],
    [shouldSet(key), setState(state)],
    [otherwise, () => state]
  ])(action)
}

export const action =
  <T>(key: string) =>
  (payload: T | ((a: T) => T)) =>
    typeof payload === 'function'
      ? ({ type: mapAction(key), payload })
      : ({ type: setAction(key), payload })
