import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header"

export const getSearchResults = createAsyncThunk(  
  "searchResult",
  async (searchTerm) => {
    const res_users = await http.get(`users/?search=${searchTerm}`, {headers: authHeader()})
    const users = res_users.data
    const res_videos = await http.get(`videos/?search=${searchTerm}`, {headers: authHeader()})
    const videos = res_videos.data
    
    return { users, videos };
  }
);

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    isFetching: true,
    users: [],
    videos: [],
  },
  reducers: {
    toggleSubscribeSearchResults(state, action) {
      state.users = state.users.map((user) =>
        action.payload === user.id
          ? { ...user, isSubscribed: !user.isSubscribed }
          : user
      );
    },
    clearSearchResults(state, action) {
      state.users = [];
      state.videos = [];
      state.isFetching = false;
    },
  },
  extraReducers: {
    [getSearchResults.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload.videos;
      state.users = action.payload.users;
    },
  },
});

export const {
  toggleSubscribeSearchResults,
  unsubscribeFromSearchResults,
  clearSearchResults,
} = searchResultSlice.actions;

export default searchResultSlice.reducer;
