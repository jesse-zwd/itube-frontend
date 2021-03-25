import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from '../services/header'

export const getTrending = createAsyncThunk(
  "trending/getTrending",
  async () => {
    const res = await http.get(`videos`, {headers: authHeader()})
    res.data.sort((a, b) => b.views - a.views)
    return res.data
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getTrending.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default trendingSlice.reducer;
