import flow from 'lodash/fp/flow'
import { Item, ShoppingCart } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { action, read } from '../redux/redux.utils'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../domain/shoppingCart.logic'

// [ Requirements ]
// - Users can add items to their shopping cart
// - Shows a user how many items are remaining as they add items to their cart

export const ViewItem = (item: Item) => {
  const dispatch = useDispatch()
  const addToCart = flow(action(SHOPPING_CART, 'ViewItem::addToCart'), dispatch)
  const cart = useSelector(read<ShoppingCart>(SHOPPING_CART))
  const itemInCart = cart.items.find(({ id }: Item) => item.id === id)

  return (
    <div
      style={{
        border: '1px solid black',
        width: '10rem',
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <p>
        {item.name}: ${item.price}
      </p>
      <p>Remaining: {42 - (itemInCart ? itemInCart?.quantity : 0)}</p>
      <button onClick={() => addToCart(updateCart({ item }))}>
        Add to Cart
      </button>
    </div>
  )
}
