import api from '../../api';

import RoadmapActionTypes from './roadmap.types';


export const fetchAllRoadmaps = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        
        api.get('api/roadmaps/', {
            headers: {
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
            dispatch({
                type: RoadmapActionTypes.FETCH_ALL_ROADMAP,
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
        const { token, user } = getState().auth
        if (user) {
            api.get(`api/users/${user.id}/roadmaps/`, {
                headers: {
                    Authorization: token ? `Token ${token}` : ''
                }
            })
            .then(res => {
                dispatch({
                    type: RoadmapActionTypes.FETCH_ROADMAP_BY_USER,
                    payload: res.data.results,
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}

export const fetchMostPopularRoadmaps = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        api.get('api/roadmaps/most-popular/', {
            headers: {
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
            dispatch({
                type: RoadmapActionTypes.FETCH_MOST_POPULAR_ROADMAPS,
                payload: res.data,
            })
            
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: RoadmapActionTypes.FETCH_MOST_POPULAR_ROADMAPS_FAIL,
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
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
            dispatch({
                type: RoadmapActionTypes.FETCH_HIGHEST_RATED_ROADMAPS,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
            dispatch(({
                type: RoadmapActionTypes.FETCH_HIGHEST_RATED_ROADMAPS_FAIL,
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
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
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