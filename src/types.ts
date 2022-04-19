export type Functor<A> = {
  x: A
  fold: <B>(f: Function) => B
  map: (f: (a: A) => A) => Functor<A>
  of: (value: A) => Functor<A>
}

export type ReduxPayload<A> = (a: A) => A | A

export type ReduxAction<A> = {
  type: string
  payload: ReduxPayload<A>
}

export type Item = {
  id: string
  name: string
  price: number
  quantity: number
}
export const item = () => ({
  id: '',
  name: '',
  price: 0,
  quantity: 0,
})

export type ShoppingCart = {
  items: Item[]
  subtotal: number
  taxes: number
  shipping: number
}
export const shoppingCart = (): ShoppingCart => ({
  items: [],
  shipping: 0,
  subtotal: 0,
  taxes: 0,
})
