import React from 'react'
import flow from 'lodash/fp/flow'
import type { Item, ShoppingCart } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { action } from '../redux/redux.utils'
import { useDispatch } from 'react-redux'

// interface ItemProps {}
export const ReviewItem: React.FC<Item> = (props) => {
  const [adjustment, setAdjustment] = React.useState<number>(1)
  const dispatch = useDispatch()
  const updateQuantity = flow(
    action(SHOPPING_CART, 'ReviewItem::updateQuantity'),
    dispatch
  )

  /**
   * Update an Item in cart by applying a function to it
   */
  const updateItem =
    (modify: (item: Item) => Item) =>
    (cart: ShoppingCart): ShoppingCart => ({
      ...cart,
      items: cart.items.map((item) =>
        item.id === props.id ? modify(item) : item
      ),
    })

  /**
   * increase the quantity of an item in shopping cart by designated amount
   */
  const increaseItemQuantity =
    (amount: number) =>
    (item: Item): Item => ({
      ...item,
      quantity: item.quantity + amount,
    })

  /**
   * decrease the quantity of an item in shopping cart by designated amount
   */
  const decreaseItemQuantity =
    (amount: number) =>
    (item: Item): Item => ({
      ...item,
      quantity: item.quantity - amount,
    })

  const addQuantity = flow(increaseItemQuantity, updateItem, updateQuantity)
  const removeQuantity = flow(decreaseItemQuantity, updateItem, updateQuantity)

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
      <button onClick={() => removeQuantity(adjustment)}>Remove</button>
      <input
        type="number"
        style={{ width: '3rem' }}
        value={adjustment}
        onChange={({ target }) => setAdjustment(Number(target.value))}
      />
      <button onClick={() => addQuantity(adjustment)}>Add</button>
    </div>
  )
}
