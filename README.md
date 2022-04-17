# KISS Redux Pattern
The following example outlines a basic counter for quick groking; however, since
counters lack all the complexity that comes with the challenges of implementing
real world applications, the repo is setup with a shopping cart that has complex
state updates. See comments around `[Requirements]` and `[New Feautre Request]`
to better understand the benefits of a pattern like this. The example below is
followed by a discussion challenging some of our preconceptions about Redux and
uses Redux documentation to try and avoid strawmans arguments.

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

### define business logic layer

```ts
// counter.logic.ts
export const increment = add(1)
export const decrement = subtract(1)
```

### consume in component

```tsx
import flow from 'lodash/fp/flow'
import { COUNTER_KEY } from './redux/_keys'
import { decrement, increment } from './counter.logic'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const count: number = useSelector(read(COUNTER_KEY))
  const setCounter = flow(action<number>(COUNTER_KEY), dispatch)

  return (
    <>
      <div className="App">
        <p>Obligatory Counter: {count}</p>
        <button onClick={() => setCounter(decrement)}>Dec</button>
        <button onClick={() => setCounter(increment)}>Inc</button>
        <button onClick={() => setCounter(0)}>Reset Count</button>
      </div>
    </>
  )
}
```

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

The Redux documentation stipuldates that you should "put as much logic as
possible in reducers."

```
Wherever possible, try to put as much of the logic for calculating a new state
into the appropriate reducer, rather than in the code that prepares and
dispatches the action (like a click handler). This helps ensure that more of
the actual app logic is easily testable, enables more effective use of
time-travel debugging, and helps avoid common mistakes that can lead to
mutations and bugs.
```

The following implementation does not enforce this best practice but it does
encourage it. However, traditional Redux reducers do not enforce this best
practice either. The underlying motivation for this practice is described as:

```
Reducers are always easy to test, because they are pure functions - you just
call const result = reducer(testState, action), and assert that the result is
what you expected. So, the more logic you can put in a reducer, the more logic
you have that is easily testable.
```

Placing a function inside the payload may seem outside the box, but technically
speaking it does not break any intrinsic properties or best practices of what is
allowed to be inside a payload or how a reducer should behave. Functions are
first class objects and as long as they are pure then they are easy to test and
assert.

### What do we gain

- Composable business logic is guaranteed.
- Complex business logic is more naturally broken down into numerous unit tests
- Redux testing is more conducive to integration tests than unit tests. It is
  easy to write a unit test asserting a mock after an action is received. The
  problem is that we still haven't tested what Redux is responsible for doing
  which is ensuring messages are executed on specfic events. This is best done
  through integration and e2e testing.
- More concise code means less ceremony and less realestate for bugs.
- Timeline walking in DevTools displays the function that accompanied the
  messages allowing for linear debugging. While large functions are noisy, this
  noise encourages breaking down functions into smaller declarative units for 
  cleaner logging.
- Action types/messages are generated based on payload to create another layer
  of debugging.
- Redux state is locked inside an immutable data structure preventing quick
  hacky attempts of solving a challenge/requirement with room to provide
  additional safeguards as desired. Trapping anti-patterns with data structures
  that prevent them are significantly more powerful than linting rules.

### What doesn't change

- Any component can manipualte redux state by dispatching actions.
- Middleware can still be used but redux middleware thrives on unique messages
  so a little more thoughtfulness has to be employed with type/payload analysis.

### Is this better than a Singleton?

Absolutely. The problem with Singletons are shared mutable state. This pattern
has no mutation and requires pure state changes to be well defined within
functions. Redux solves a lot of singleton problems because all changes go
through a pipeline of changes that can be tracked, analyzed, and rewound,
wheres as shared mutable state cannot. It is anyone's guess when a change
occurs unless you add logging to the Singleton.
