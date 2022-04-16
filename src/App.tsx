import flow from 'lodash/fp/flow'
import { action, read } from './redux/redux.utils'
import { COUNTER_KEY } from './redux/_keys'
import { useDispatch, useSelector } from 'react-redux'

// local utils
const add = (a: number) => (b: number) => a + b
const subtract = (a: number) => (b: number) => b - a

function App() {
  const dispatch = useDispatch()
  const count = useSelector(read<number>(COUNTER_KEY))
  const setCounter = flow(action<number>(COUNTER_KEY, 'App'), dispatch)

  return (
    <>
      <p>Obligatory Counter: {count}</p>
      <button onClick={() => setCounter(subtract(1))}>Decrement</button>
      <button onClick={() => setCounter(add(1))}>Increment</button>
      <button onClick={() => setCounter(0)}>Reset Count</button>
    </>
  )
}

export default App
