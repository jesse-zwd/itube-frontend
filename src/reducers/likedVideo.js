import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header";

export const getLikedVideos = createAsyncThunk(
  "likedVideo/getLikedVideos",
  async () => {
    const res = await http.get(`videosliked`, {headers: authHeader()})
    return res.data[0]['videos']
  }
);

const likedVideoSlice = createSlice({
  name: "likedVideo",
  initialState: {
    isFetching: true,
    videos: [],
  },
  reducers: {
    addToLikedVideos(state, action) {
     
    },
    removeFromLikedVideos(state, action) {
     
    }
  },
  extraReducers: {
    [getLikedVideos.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export const {
  addToLikedVideos,
  removeFromLikedVideos,
} = likedVideoSlice.actions;

export default likedVideoSlice.reducer;
