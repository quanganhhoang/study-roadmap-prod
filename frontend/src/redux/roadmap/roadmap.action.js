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

export const searchRoadmaps = (searchTerm) => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        api.get(`api/roadmaps?search=${searchTerm}`, {
            headers: {
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
            dispatch({
                type: RoadmapActionTypes.SEARCH_ROADMAPS_SUCCESS,
                searchResult: res.data.results,
                searchTerm: searchTerm
            })
            
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: RoadmapActionTypes.SEARCH_ROADMAPS_FAIL,
                error: err,
                searchTerm: searchTerm,
            }))
        })
    }
}