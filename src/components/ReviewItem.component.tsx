import React from 'react'
import flow from 'lodash/fp/flow'
import type { Item } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { action } from '../redux/redux.utils'
import { updateCart } from '../domain/shoppingCart.logic'
import { useDispatch } from 'react-redux'

// [ Requirements ]
// - Users can add/remove multiple items from their shopping cart while reviewing
// - Users cannot create negative cart quantities

// [ New Feature Request ]
// Users want to be able to undo changes they make to their cart before
// clicking "checkout." Because we did not couple our business logic to our
// state management. All we have to do is remove all our dispatch logic and
// store changes in the parent component in a useState hook.

export const ReviewItem = (item: Item) => {
  const [adjustment, setAdjustment] = React.useState<number>(1)
  const dispatch = useDispatch()

  const updateCartItem = flow(
    updateCart,
    action(SHOPPING_CART, 'ReviewItem::updateCartItem'),
    dispatch
  )

  const handleUpdate = (quantity: number) => {
    // this logic should go in logic.ts but I got lazy
    if (item.quantity + quantity >= 0) {
      updateCartItem({ item, quantity })
    }
  }

  return (
    <div
      style={{
        border: '1px solid black',
        width: '10rem',
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <p>Name: {item.name}</p>
      <p>Cost: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleUpdate(-adjustment)}>Remove</button>
      <input
        min={0}
        onChange={({ target }) => setAdjustment(Number(target.value))}
        style={{ width: '3rem' }}
        type="number"
        value={adjustment}
      />
      <button onClick={() => handleUpdate(adjustment)}>Add</button>
    </div>
  )
}
