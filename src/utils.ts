export const applyTo =
  <T>(state: T) =>
  (fn: (state: T) => T) =>
    fn(state)
