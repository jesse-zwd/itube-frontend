import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header";

export const getRecommendation = createAsyncThunk(
  "recommendation/getRecommendation",
  async () => {
    const res = await http.get(`videoRecommended/`, {headers: authHeader()})
    return res.data
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    isFetching: true,
    videos: [],
  },
  reducers: {
    addToRecommendation(state, action) {
      state.videos = [action.payload, ...state.videos];
    },
  },
  extraReducers: {
    [getRecommendation.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export const { addToRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
