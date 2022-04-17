import React from 'react'
import flow from 'lodash/fp/flow'
import { SHOPPING_CART } from '../redux/_keys'
import { action, read } from '../redux/redux.utils'
import { add } from 'lodash'
import { shoppingCart, ShoppingCart } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { ReviewItem } from './ReviewItem.component'

interface SideBarProps {}
export const SideBar: React.FC<SideBarProps> = () => {
  const dispatch = useDispatch()
  const clearShoppingCart = flow(
    action(SHOPPING_CART, 'SideBar::clearShoppingCart'),
    dispatch
  )
  const { items, shipping, subtotal, taxes } = useSelector(
    read<ShoppingCart>(SHOPPING_CART)
  )

  const handleCheckout = () => {
    setTimeout(() => {
      // submit shopping cart to API, on success clear shopping cart
      clearShoppingCart(shoppingCart())
    }, 100)
  }

  return (
    <div
      style={{
        width: '30rem',
        border: '1px solid blue',
        margin: '1rem',
        padding: '1rem',
      }}
    >
      <h2>Review Order</h2>
      <div>
        <p>Items:</p>
        {items.map((item) => (
          <div key={item.id}>
            <ReviewItem {...item} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>SubTotal: ${subtotal}</p>
        <p>Taxes: ${taxes}</p>
        <p>Shipping: ${shipping}</p>
        <p>Total: ${[subtotal, taxes, shipping].reduce(add)}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleCheckout}>Clear Shopping Cart</button>
        <button>Checkout</button>
      </div>
    </div>
  )
}
