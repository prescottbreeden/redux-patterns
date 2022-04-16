import { COUNTER_KEY } from '../_keys'

export const counterMiddleware = () => (next: Function) => (action: any) => {
  next(action)

  if (action.type.includes(COUNTER_KEY)) {
    // if middleware is necessary, do something here, but in huge projects
    // it can be ugly to to debug, hard to test, and there is almost always an
    // alternative
  }
}
