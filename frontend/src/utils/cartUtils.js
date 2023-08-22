export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //*  calcualte the Price
  state.itemPrice = addDecimals(
    state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //*  calculate shipping charges
  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

  //*  calculate tax price
  state.taxPrice = addDecimals(0.15 * state.itemPrice);

  //*  calculate total price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  //* save to the localstorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
