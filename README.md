# KISS Redux Pattern

## Useful abstractions have strong limitations

A Map is a useful abstraction because it is significantly more limiting than a
For loop. Strong limitations lead to code that is easier to digest and debug and
code that is more unified and consistent accross different teams.

## Take only what you need to survive...

### `Action.of :: Key -> T -> T`
Takes key and new state replaces existing state with a new state

### `Action.map :: Key -> (T -> T) -> T`
Takes a key and function and applies it to the current state

### src/redux/redux.utils.ts

```tsx
// action factory
const buildAction = curry((key: string, type: string) => `${key} 🚀 ${type}`)
const updateAction = (key: string) => buildAction(key, 'UPDATE')
const mapAction = (key: string) => buildAction(key, 'MAP')

// action predicates
const shouldUpdate = (key: string) => flow(read('type'), eq(updateAction(key)))
const shouldMap = (key: string) => flow(read('type'), eq(mapAction(key)))

// state transformation
const updateState =
  <T>(state: T) =>
  (action: any) =>
    flow(read('payload'), merge(state))(action)

const mapState =
  <T>(state: T) =>
  (action: any) =>
    flow(read('payload'), applyTo(state))(action)

// one reducer to rule them all and in the darkness bind them
export const createReducer =
  <T>(key: string, initial: T) =>
  (currentState: T, action: any) => {
    const state = currentState ?? initial
    return cond([
      [shouldUpdate(key), updateState(state)],
      [shouldMap(key), mapState(state)],
      [otherwise, () => state],
    ])(action)
  }

export const action =
  <T>(key: string) =>
  (payload: T | ((a: T) => T)) =>
    ({ type: mapAction(key), payload })
