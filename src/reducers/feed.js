import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header";

export const getFeed = createAsyncThunk("feed/getFeed", async () => {
  const res = await http.get(`feed/`, {headers: authHeader() })
  return res.data
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getFeed.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default feedSlice.reducer;
