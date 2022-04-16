import './App.css'
import React from 'react'
import flow from 'lodash/fp/flow'
import { action, read } from './redux/redux.utils'
import { Code } from './Code'
import { OPINION_KEY, COUNTER_KEY } from './redux/_keys'
import { OpinionWarning } from './OpinionWarning'
import { useDispatch, useSelector } from 'react-redux'

// local utils
const add = (a: number) => (b: number) => a + b
const subtract = (a: number) => (b: number) => b - a

function App() {
  const dispatch = useDispatch()
  const count: number = useSelector(read(COUNTER_KEY))

  const setCounter = flow(action<number>(COUNTER_KEY), dispatch)
  const mapOpinion = flow(action<boolean>(OPINION_KEY), dispatch)

  return (
    <>
      <div className="App">
        <h1>Redux</h1>
        <p>Obligatory Counter: {count}</p>
        <button onClick={() => setCounter(subtract(1))}>Decrement</button>
        <button onClick={() => setCounter(add(1))}>Increment</button>
        <button onClick={() => setCounter(0)}>Reset Count</button>
        <div style={{ margin: '2rem' }} />
        <button onClick={() => mapOpinion((x: boolean) => !x)}>
          Click if you're interested in my opinion
        </button>
        <p>
          Toggle Redux DevTools with <Code>ctl-h</Code> / Reposition with{' '}
          <Code>ctl-g</Code>
        </p>
        <OpinionWarning />
      </div>
    </>
  )
}

export default App
