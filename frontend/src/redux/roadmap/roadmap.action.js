import api from '../../api';

import RoadmapActionTypes from './roadmap.types';


export const fetchRoadmapRequested = () => {
    return {
        type: RoadmapActionTypes.FETCH_ROADMAPS_REQUESTED
    }
}

export const fetchAllRoadmapSuccess = (data) => {
    return {
        type: RoadmapActionTypes.FETCH_ALL_ROADMAP_SUCCESS,
        payload: data
    }
}

export const fetchAllRoadmapFail = (error) => {
    return {
        type: RoadmapActionTypes.FETCH_ALL_ROADMAP_FAIL,
        payload: error
    }
}

export const fetchMostPopularRoadmapsSuccess = (data) => {
    return {
        type: RoadmapActionTypes.FETCH_MOST_POPULAR_ROADMAPS_SUCCESS,
        payload: data
    }
}

export const fetchMostPopularRoadmapsFail = (error) => {
    return {
        type: RoadmapActionTypes.FETCH_MOST_POPULAR_ROADMAPS_FAIL,
        payload: error
    }
}

export const fetchHighestRatedRoadmapsSuccess = (data) => {
    return {
        type: RoadmapActionTypes.FETCH_HIGHEST_RATED_ROADMAPS_SUCCESS,
        payload: data
    }
}

export const fetchHighestRatedRoadmapsFail = (error) => {
    return {
        type: RoadmapActionTypes.FETCH_HIGHEST_RATED_ROADMAPS_FAIL,
        payload: error
    }
}

export const fetchRoadmapsByUserSuccess = (data) => {
    return {
        type: RoadmapActionTypes.FETCH_ROADMAP_BY_USER_SUCCESS,
        payload: data
    }
}

export const fetchRoadmapsByUserFail = (error) => {
    return {
        type: RoadmapActionTypes.FETCH_ROADMAP_BY_USER_FAIL,
        payload: error
    }
}

export const searchRoadmapStart = (searchTerm) => {
    return {
        type: RoadmapActionTypes.SEARCH_ROADMAPS_START,
        payload: searchTerm
    }
}

export const searchRoadmapSuccess = (data) => {
    return {
        type: RoadmapActionTypes.SEARCH_ROADMAPS_SUCCESS,
        payload: data
    }
}

export const searchRoadmapFail = (error) => {
    return {
        type: RoadmapActionTypes.SEARCH_ROADMAPS_FAIL,
        payload: error
    }
}