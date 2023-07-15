// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  emojis: [],
};

const emojisSlice = createSlice({
  name: "emojis",
  initialState,
  reducers: {
    setEmojis(state, action) {
      state.emojis = action.payload;
    },
  },
});

const store = configureStore({ reducer: emojisSlice.reducer });

export const { setEmojis } = emojisSlice.actions;

export default store;
