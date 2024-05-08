import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'orderInfo',
  initialState: {
    data: null,
  },
  reducers: {
    setOrderInfo(state, action) {
      state.data = action.payload;
    },
    clearOrderInfo(state) {
      state.data = null;
    },
  },
});

export const { setOrderInfo, clearOrderInfo } = OrderSlice.actions;

export default OrderSlice.reducer;
