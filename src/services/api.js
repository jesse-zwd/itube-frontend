import authHeader from "./header";
import http from "./http";

export const newChannel = async (id) => {
    http.post(`channel/`, {channel: id}, {headers: authHeader()})
}

export const deleteChannel = async (id) => {
    http.delete(`channel/${id}/`, {headers: authHeader()})
}

export const newLike = async (id) => {
    http.post(`videolike/`, {video: id}, {headers: authHeader()})
}

export const deleteLike = async (id) => {
    http.delete(`videolike/${id}/`, {headers: authHeader()})
}

export const newDislike = async (id) => {
    http.post(`videodislike/`, {video: id}, {headers: authHeader()})
}

export const deleteDislike = async (id) => {
    http.delete(`videodislike/${id}/`, {headers: authHeader()})
}

export const newComment = async (payload) => {
    const res = http.post(`comments/`, payload, { headers: authHeader() })
    return res.data
}

export const saveProfile = async ({ id, updates }) => {
    http.put(`profile/${id}/`, updates, {headers: authHeader()})
}

export const videoViewed = async (id) => {
    http.post(`view/`, {video: id}, {headers: authHeader()})
}

export const newVideo = async (payload) => {
    const res = http.post(`videos/`, payload, {headers: authHeader()})
    return res.data
}