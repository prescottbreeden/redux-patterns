# KISS Redux Pattern

## Is this "reduxy?"

### Data Structure

The Redux documentation says this on designing state structure:

```
With Redux, our application state is always kept in plain JavaScript objects and arrays.
```

The following implementation obeys this rule.

### Reducer Logic

Defining redux transformations have traditionally always been done inside a
reducer file within the redux pipeline. This is largely ceremony, as Redux docs
do not stipulate this is a requirement. Their requirements for reducers are as
follows:

```
We said earlier that reducers must always follow some special rules:

- They should only calculate the new state value based on the state and action
  arguments

- They are not allowed to modify the existing state. Instead, they must make
  immutable updates, by copying the existing state and making changes to the
  copied values.

- They must not do any asynchronous logic or other "side effects"
```

The point they drive home is that reducer logic must be pure and the following
implementation obeys this rule.

Another misconception is the idea that redux should encapsulate business logic.
The problem is that at best, it does so in the leakiest of fashion. `Document Actions` stipulate entire payloads of data to set into state. Other actions
usually carry payloads with all sorts of data:

```
We normally put any extra data needed to describe what's happening into the
action.payload field. This could be a number, a string, or an object with
multiple fields inside.
```

So at what point, in all the component level events leading up to a dispatch
does the logic start or cease to be business logic? The only real answer to this
is "logic that cannot be executed by redux" however this has no bearing on the
domain of the question, this is a technicalogical limitation and the domain of
a web app has nothing to do with technical limitations.

Placing a function inside the payload may seem outside the box, but technically
speaking it does not break any intrinsic properties of what is allowed to be
inside a payload. Functions are first class objects.

## Useful abstractions have strong limitations

A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams. The current
abstraction forces all business related logic to be pure in order for it to be
mapped with redux.

## High Level Overview

### create 1 of 2 different action types

#### `action :: Key -> (T -> T) | T`

Takes key and a payload that is either a new state or a function that returns a
new state

```ts
export const action =
  <T>(key: string) =>
  (payload: T | ((a: T) => T)) =>
    typeof payload === 'function'
      ? { type: mapAction(key), payload }
      : { type: setAction(key), payload }
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
