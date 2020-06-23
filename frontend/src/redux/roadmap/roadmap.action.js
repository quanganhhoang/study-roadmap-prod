import api from '../../api';

import {
    FETCH_ALL_ROADMAP,
    FETCH_ROADMAP_BY_USER,
    FETCH_MOST_POPULAR_ROADMAPS,
    FETCH_MOST_POPULAR_ROADMAPS_FAIL,
    FETCH_HIGHEST_RATED_ROADMAPS,
    FETCH_HIGHEST_RATED_ROADMAPS_FAIL,

    // SEARCH BAR
    SEARCH_ROADMAPS_SUCCESS,
    SEARCH_ROADMAPS_FAIL,
    // SEARCH BAR
} from './roadmap.types'


export const fetchAllRoadmaps = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        
        api.get('api/roadmaps/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: FETCH_ALL_ROADMAP,
                payload: res.data.results,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchRoadmapByUser = () => {
    return (dispatch, getState) => {
        const { token, userId } = getState().auth
 
        api.get(`api/users/${userId}/roadmaps/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: FETCH_ROADMAP_BY_USER,
                payload: res.data.results,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchMostPopularRoadmaps = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        api.get('api/roadmaps/most-popular/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: FETCH_MOST_POPULAR_ROADMAPS,
                payload: res.data,
            })
            
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: FETCH_MOST_POPULAR_ROADMAPS_FAIL,
                payload: err,
            }))
        })
    }
}

export const fetchHighestRatedRoadmaps = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        api.get('api/roadmaps/highest-rated/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            dispatch({
                type: FETCH_HIGHEST_RATED_ROADMAPS,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: FETCH_HIGHEST_RATED_ROADMAPS_FAIL,
                payload: err,
            }))
        })
    }
}

// TODO(qahoang): implement search feature
export const searchRoadmaps = (searchTerm) => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        api.get(`api/roadmaps?search=${searchTerm}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            console.log('res', res)
            dispatch({
                type: SEARCH_ROADMAPS_SUCCESS,
                searchResult: res.data.results,
                searchTerm: searchTerm
            })
            
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: SEARCH_ROADMAPS_FAIL,
                error: err,
                searchTerm: searchTerm,
            }))
        })
    }
}
// async await syntax

/*
export const fetchAllRoadmaps = () => async (dispatch, getState) => {
    const response = await api.get('api/roadmaps/', {
        headers: {
            Authorization: `Token ${token}`
        }
    })

    dispatch({
        type: 'FETCH_ALL_ROADMAP',
        payload: response
    })
}
*/