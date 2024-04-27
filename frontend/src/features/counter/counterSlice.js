import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(incrementAsync.pending,(state)=>{
        state.status = 'loading';
    })
    .addCase(incrementAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        state.value+= action.payload;
    });
  }
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer