import type { Item, ShoppingCart } from '../types'
import { add } from '../utilities/math.utils'

/**
 * Recalculate totals on an update
 */
const updateTotals = (
  item: Item,
  cart: ShoppingCart
): Partial<ShoppingCart> => ({
  subtotal: add(cart.subtotal, item.price),
  taxes: add(cart.taxes, item.price * 0.1),
  shipping: add(cart.shipping, 5),
})

/**
 * Determine if an item should be added to a list of items or if it should
 * update the cart quantity of that item
 */
const insertItem = (newItem: Item, cart: ShoppingCart): Item[] => {
  return cart.items.find(({ id }) => id === newItem.id)
    ? cart.items.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...cart.items, newItem]
}

/**
 * Update the properties of a shopping cart when an item is added to it by
 * checking if it is already in the cart before adding and update totals. If an
 * item is already in the cart, it will increment the quantity of that item
 * instead of duplicating the item in the cart.
 */
export const updateCart =
  (item: Item) =>
  (cart: ShoppingCart): ShoppingCart => ({
    ...cart,
    items: insertItem(item, cart),
    ...updateTotals(item, cart),
  })

// exported only for unit-testing
export const test_only = {
  insertItem,
  updateTotals,
}
