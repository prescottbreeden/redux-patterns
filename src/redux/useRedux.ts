import flow from 'lodash/fp/flow'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxPayload } from '../types'
import { action, read } from './redux.utils'

// local string builder helper function
const createMetaData = (meta: string = '?', location: string = '?') =>
  [meta, '::', location].join('')

export const useRedux = <T>(key: string, meta?: string) => {
  const d = useDispatch()

  // return data from store
  const data = useSelector(read<T>(key))

  // send a function to map
  const dispatch = (payload: ReduxPayload<T>, location?: string) =>
    flow(action<T>(key, createMetaData(meta, payload.name)), d)(payload)

  // send a pipeline
  const pipe = (...fns: Array<(s: T) => T>) =>
    flow(
      action(key, createMetaData(meta, 'pipe')),
      d
    )((state: T) => fns.reduce((acc, fn) => fn(acc), state))

  return {
    data,
    dispatch,
    pipe,
  }
}
