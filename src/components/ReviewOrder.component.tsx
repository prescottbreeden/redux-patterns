import { ReviewItem } from './ReviewItem.component'
import { SHOPPING_CART } from '../redux/_keys'
import { add } from 'lodash'
import { shoppingCart, ShoppingCart } from '../types'
import { useRedux } from '../redux/useRedux'

// [ Requirements ]
// - Users can see items in their shopping cart
// - Users can checkout and purchase the items in their cart

// [ New Feature Request ]
// Users want to be able to undo changes they make to their cart before
// clicking "checkout." Because we did not couple our business logic to our
// state management. All we have to do is remove the dispatch logic from the
// ReviewItem components and pass on onChange handler to store the state
// locally in the ReviewOrder until they decide to save or checkout. All the
// business logic in our utilites are imported this function and GG.

export const ReviewOrder = () => {
  const { data, dispatch, pipe } = useRedux<ShoppingCart>(
    SHOPPING_CART,
    'ReviewOrder'
  )
  const { items, shipping, subtotal, taxes } = data

  // const handleCheckout = () => dispatch(shoppingCart)
  const handleCheckout = () => {
    pipe(
      (s: ShoppingCart) => s,
      (s: ShoppingCart) => s,
      () => shoppingCart()
    )
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
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}
