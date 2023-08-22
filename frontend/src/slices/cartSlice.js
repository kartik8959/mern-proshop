import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItem.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItem = state.cartItem.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      return updateCart(state);
    },
    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
  },
});

export const { addToCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
