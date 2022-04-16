export type Functor<T> = {
  x: T,
  fold: (f: Function) => T,
  map: (f: (a: T) => T) => Functor<T>
  of: (value: T) => Functor<T>
}

export type ReduxAction<A> = {
  type: string,
  payload: (a: A) => A | A
}
