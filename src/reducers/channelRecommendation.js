import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from '../services/http'
import authHeader from "../services/header";

export const getChannels = createAsyncThunk(
  "channelRecommendation/getChannels",
  async () => {
    const res = await http.get(`channelRecommended/`, {headers: authHeader()})
    return res.data
  }
);

const channelRecommendationSlice = createSlice({
  name: "channelRecommendation",
  initialState: {
    isFetching: true,
    channels: [],
  },
  reducers: {
    toggleSubscribeChannelRecommendation(state, action) {
      state.channels = state.channels.map((channel) =>
        channel.id === action.payload
          ? { ...channel, isSubscribed: !channel.isSubscribed }
          : channel
      );
    },
  },
  extraReducers: {
    [getChannels.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.channels = action.payload;
    },
  },
});

export const {
  toggleSubscribeChannelRecommendation,
} = channelRecommendationSlice.actions;

export default channelRecommendationSlice.reducer;
