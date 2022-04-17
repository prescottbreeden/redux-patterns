import flow from 'lodash/fp/flow'
import type { Item, ShoppingCart } from '../types'
import { add } from '../utilities/math.utils'

// --[ More Complex Business Logic Than A Counter ]----------------------------
// This file is to provide an example of logic significantly meatier than a
// counter which doesn't offer much for discussion about what happens as
// complexity increases.
//
// [ Requirements ]
// Items can be added and and removed during order review after they've already
// been added to a shopping cart.

type EditCartItem = {
  quantity?: number
  item: Item
}

/**
 * Determine if an item should be added to a list of items or if it should
 * update the cart quantity of that item
 */
const updateQuantity =
  ({ item, quantity = 1 }: EditCartItem) =>
  (cart: ShoppingCart): ShoppingCart => {
    // check if the item is in list and update accordingly
    const items = cart.items.find(({ id }) => id === item.id)
      ? cart.items.map((cartItem) =>
          item.id === cartItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      : [...cart.items, { ...item, quantity: quantity }]

    return { ...cart, items }
  }

/**
 * Recalculate totals on an update
 */
const updateTotals =
  ({ item, quantity = 1 }: EditCartItem) =>
  (cart: ShoppingCart): ShoppingCart => {
    return {
      ...cart,
      subtotal: add(cart.subtotal, item.price * quantity),
      taxes: add(cart.taxes, item.price * quantity * 0.1),
      shipping: add(cart.shipping, 5 * quantity),
    }
  }

/**
 * Update the properties of a shopping cart when an item is added to it by
 * checking if it is already in the cart before adding and update totals. If an
 * item is already in the cart, it will increment the quantity of that item
 * instead of duplicating the item in the cart.
 */
export const updateCart =
  ({ item, quantity = 1 }: EditCartItem) =>
  (cart: ShoppingCart): ShoppingCart =>
    flow(
      updateTotals({ item, quantity }),
      updateQuantity({ item, quantity })
    )(cart)

// exported only for unit-testing
export const test_only = {
  updateQuantity,
  updateTotals,
}
