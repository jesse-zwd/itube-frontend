import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header";

export const getHistory = createAsyncThunk("history/getHistory", async () => {
  const res = await http.get(`videosViewed`, {headers: authHeader()})
  return res.data[0]['videos']
});

const historySlice = createSlice({
  name: "history",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default historySlice.reducer;
