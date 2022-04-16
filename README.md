# KISS Redux Pattern

## Useful abstractions have strong limitations

A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams.

## Take only what you need to survive...

### create 1 of 2 different action types

#### `action :: Key -> (T -> T) | T`
Takes key and a payload that is either a new state or a function that returns a
new state

```ts
export const action =
  <T>(key: string) =>
  (payload: T | ((a: T) => T)) =>
    typeof payload === 'function'
      ? ({ type: mapAction(key), payload })
      : ({ type: setAction(key), payload })

```

### create slice on store
```ts
import * as Keys from './_keys'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  [Keys.COUNTER_KEY]: createReducer(Keys.COUNTER_KEY, 0),
})
```

### consume in component
```tsx
import flow from 'lodash/fp/flow'
import { useDispatch, useSelector } from 'react-redux'
import { COUNTER_KEY } from './redux/_keys'

function App() {
  const dispatch = useDispatch()
  const count: number = useSelector(read(COUNTER_KEY))

  const setCounter = flow(action<number>(COUNTER_KEY), dispatch)

  return (
    <>
      <div className="App">
        <p>Obligatory Counter: {count}</p>
        <button onClick={() => setCounter(subtract(1))}>Dec</button>
        <button onClick={() => setCounter(add(1))}>Inc</button>
        <button onClick={() => setCounter(0)}>Reset Count</button>
      </div>
    </>
  )
}

```

