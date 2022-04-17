import { MERCH } from '../dummyData'
import { ShoppingCart, shoppingCart } from '../types'
import { updateCart, test_only } from './shoppingCart.logic'
const { updateQuantity, updateTotals } = test_only

const mockBook = MERCH[0]
const mockShoppingCart: ShoppingCart = {
  items: [{ id: '1', name: 'Book', price: 20, quantity: 1 }],
  shipping: 5,
  subtotal: 20,
  taxes: 2,
}

describe('updateCart', () => {
  it('should add an item to a shopping cart', () => {
    const emptyShoppingCart = shoppingCart()
    const result = updateCart({ item: mockBook })(emptyShoppingCart)
    expect(result).toStrictEqual(mockShoppingCart)
  })
  it('should be able to add multiple quantities of items to a shopping cart', () => {
    const mockResult: ShoppingCart = {
      items: [{ id: '1', name: 'Book', price: 20, quantity: 2 }],
      shipping: 10,
      subtotal: 40,
      taxes: 4,
    }
    const emptyShoppingCart = shoppingCart()
    const result = updateCart({ item: mockBook, quantity: 2 })(
      emptyShoppingCart
    )
    expect(result).toStrictEqual(mockResult)
  })
  it('should be able to remove an item from a shopping cart', () => {
    const mockCart: ShoppingCart = {
      items: [{ id: '1', name: 'Book', price: 20, quantity: 2 }],
      shipping: 10,
      subtotal: 40,
      taxes: 4,
    }
    const result = updateCart({ item: mockBook, quantity: -1 })(mockCart)
    expect(result).toStrictEqual(mockShoppingCart)
  })
  it('should be able to remove multiple quantites of items', () => {
    const mockCart: ShoppingCart = {
      items: [{ id: '1', name: 'Book', price: 20, quantity: 2 }],
      shipping: 10,
      subtotal: 40,
      taxes: 4,
    }
    const mockResult: ShoppingCart = {
      items: [{ id: '1', name: 'Book', price: 20, quantity: 0 }],
      shipping: 0,
      subtotal: 0,
      taxes: 0,
    }
    const result = updateCart({ item: mockBook, quantity: -2 })(mockCart)
    expect(result).toStrictEqual(mockResult)
  })
})

describe('updateTotals', () => {
  it('should create a shopping cart with updated totals', () => {
    const emptyShoppingCart = shoppingCart()
    const { shipping, subtotal, taxes } = updateTotals({
      item: mockBook,
    })(emptyShoppingCart)
    expect(shipping).toBe(5)
    expect(subtotal).toBe(20)
    expect(taxes).toBe(2)
  })
  it('can caluclate multiple quantity updates', () => {
    const emptyShoppingCart = shoppingCart()
    const { shipping, subtotal, taxes } = updateTotals({
      item: mockBook,
      quantity: 2,
    })(emptyShoppingCart)
    expect(shipping).toBe(10)
    expect(subtotal).toBe(40)
    expect(taxes).toBe(4)
  })
})

describe('updateQuantity', () => {
  it('should be able to update a quantity for an item that hasnt been added', () => {
    const mockResult = [{ id: '1', name: 'Book', price: 20, quantity: 1 }]
    const emptyShoppingCart = shoppingCart()
    const { items } = updateQuantity({
      item: mockBook,
    })(emptyShoppingCart)
    expect(items).toStrictEqual(mockResult)
  })
  it('ignores quantities of other items during an update', () => {
    const mockShoppingCart = {
      ...shoppingCart(),
      items: [
        { id: '3', name: 'DeLorean', price: 2000, quantity: 1 },
        { id: '1', name: 'Book', price: 20, quantity: 1 },
      ],
    }
    const mockResult = [
      { id: '3', name: 'DeLorean', price: 2000, quantity: 1 },
      { id: '1', name: 'Book', price: 20, quantity: 2 },
    ]
    const { items } = updateQuantity({ item: mockBook })(mockShoppingCart)
    expect(items).toStrictEqual(mockResult)
  })
})
