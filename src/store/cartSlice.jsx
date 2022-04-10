import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed : false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addToCart(state, action) {
      state.changed = true
      const newItem = action.payload
      state.totalQuantity++
      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      ) // to check if item exists
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice =
          existingItem.totalPrice + newItem.price
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.totalQuantity--
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice =
          existingItem.totalPrice - existingItem.price
      }
    },
  },
})






export const cartActions = cartSlice.actions
export default cartSlice.reducer