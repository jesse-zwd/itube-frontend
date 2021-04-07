import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from '../services/header'

export const getVideo = createAsyncThunk("video/getVideo", async (videoId) => {
  const res = await http.get(`videos/${videoId}`, {headers: authHeader()})
  return res.data 
});

const videoSlice = createSlice({
  name: "slice",
  initialState: {
    isFetching: true,
    data: {},
  },
  reducers: {
    clearVideo(state, action) {
      state.isFetching = false;
      state.data = {};
    },
    addComment(state, action) {
      state.data = {
        ...state.data,
        comments: [action.payload, ...state.data.comments],
      };
    },
    like(state, action) {
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount + 1,
      };
    },
    dislike(state, action) {
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount + 1,
      };
    },
    cancelLike(state, action) {
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount - 1,
      };
    },
    cancelDislike(state, action) {
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount - 1,
      };
    },
    subscribeFromVideo(state, action) {
      state.data = {
        ...state.data,
        isSubscribed: !state.data.isSubscribed,
      };
    },
    unsubscribeFromVideo(state, action) {
      state.data = {
        ...state.data,
        isSubscribed: !state.data.isSubscribed,
      };
    },
  },
  extraReducers: {
    [getVideo.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
  },
});

export const {
  clearVideo,
  addComment,
  like,
  dislike,
  cancelLike,
  cancelDislike,
  subscribeFromVideo,
  unsubscribeFromVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
