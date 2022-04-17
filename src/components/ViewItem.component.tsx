import React from 'react'
import flow from 'lodash/fp/flow'
import type { Item } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { action } from '../redux/redux.utils'
import { useDispatch } from 'react-redux'
import { updateCart } from '../utilities/shoppingCart.utils'

// interface ItemProps {}
export const ViewItem: React.FC<Item> = (props) => {
  const dispatch = useDispatch()
  const addToCart = flow(action(SHOPPING_CART, 'ViewItem::addToCart'), dispatch)

  return (
    <div
      style={{
        border: '1px solid black',
        width: '10rem',
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <p>Name: {props.name}</p>
      <p>Cost: {props.price}</p>
      <p>Quantity: {props.quantity}</p>
      <button onClick={() => addToCart(updateCart(props))}>Add to Cart</button>
    </div>
  )
}
