import { Item, ShoppingCart } from '../types'
import { SHOPPING_CART } from '../redux/_keys'
import { updateCart } from '../domain/shoppingCart.logic'
import { useRedux } from '../redux/useRedux'

// [ Requirements ]
// - Users can add items to their shopping cart
// - Shows a user how many items are remaining as they add items to their cart

export const ViewItem = (item: Item) => {
  const { data, dispatch } = useRedux<ShoppingCart>(SHOPPING_CART, 'ViewItem')
  const itemInCart = data.items.find(({ id }: Item) => item.id === id)
  const addToCart = () => dispatch(updateCart({ item }))

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
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}
