import { combineReducers } from "redux";

// reducers
import user from "./user";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";
import sidebar from "./sidebar";
import feed from "./feed";
import history from "./history";
import likedVideo from "./likedVideo";
import profile from './profile'
import searchResult from "./searchResult";
import trending from "./trending";
import video from './video'

export default combineReducers({
    user,
    recommendation,
    sidebar,
    channelRecommendation,
    feed,
    history,
    likedVideo,
    profile,
    searchResult,
    trending,
    video,
})