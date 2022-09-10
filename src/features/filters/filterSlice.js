const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  status: "All",
  colors: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    statusChanged: (state, action) => {
        state.status = action.payload;
    },
    colorAdded: (state, action) => {
        state.colors.push(action.payload);
    },
    colorRemoved: (state, action) => {
        state.colors = state.colors.filter(
            (existingColor) => existingColor !== action.payload
        );
    },
  },
});

export default filterSlice.reducer;
export const { 
    statusChanged,
    colorAdded,
    colorRemoved,
} =
  filterSlice.actions;
