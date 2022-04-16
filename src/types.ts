export type Functor<A> = {
  x: A,
  fold: <B>(f: Function) => B,
  map: (f: (a: A) => A) => Functor<A>
  of: (value: A) => Functor<A>
}

export type ReduxAction<A> = {
  type: string,
  payload: (a: A) => A | A
}
