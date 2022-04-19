import React from 'react'
import { Item, ShoppingCart } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { updateCart } from '../domain/shoppingCart.logic'
import { useRedux } from '../redux/useRedux'

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
  const { dispatch } = useRedux<ShoppingCart>(SHOPPING_CART, 'ReviewItem')

  const handleUpdate = (quantity: number) => {
    dispatch(updateCart({ item, quantity }), 'handleUpdate')
  }

  return (
    <div
      style={{
        border: '1px solid black',
        width: '12rem',
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
