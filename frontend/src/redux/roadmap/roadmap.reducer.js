import RoadmapActions from './roadmap.types'

const INITIAL_STATE = {
    error: null,
    loading: false,
    allRoadmaps: [],
    roadmapsByUser: [],
    mostPopularRoadmaps: [],
    highestRatedRoadmaps: [],

    // SEARCH BAR
    searchTerm: '',
    searchResult: [],
    // SEARCH BAR
}

const fetchAllRoadmapsSuccess = (state, action) => {
    return {
        ...state,
        allRoadmaps: action.payload
    }
}

const fetchAllRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const fetchRoadmapByUserSuccess = (state, action) => {
    return {
        ...state,
        roadmapsByUser: action.payload
    }
}

const fetchRoadmapByUserFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const fetchMostPopularRoadmapsSuccess = (state, action) => {
    return {
        ...state,
        mostPopularRoadmaps: action.payload
    }
}

const fetchMostPopularRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const fetchHighestRatedRoadmapsSuccess = (state, action) => {
    return {
        ...state,
        highestRatedRoadmaps: action.payload
    }
}

const fetchHighestRatedRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const searchRoadmapsSuccess = (state, action) => {
    // console.log('SEARCH ROADMAP REDUCER', action.searchResult)
    return {
        ...state,
        searchResult: action.searchResult,
        searchTerm: action.searchTerm,
    }
}

const searchRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const roadmapReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case RoadmapActions.FETCH_ALL_ROADMAP_SUCCESS:
            return fetchAllRoadmapsSuccess(state, action)
        case RoadmapActions.FETCH_ALL_ROADMAP_FAIL:
            return fetchAllRoadmapsFail(state, action)

        case RoadmapActions.FETCH_ROADMAP_BY_USER_SUCCESS:
            return fetchRoadmapByUserSuccess(state, action)
        case RoadmapActions.FETCH_ROADMAP_BY_USER_FAIL:
            return fetchRoadmapByUserFail(state, action)

        case RoadmapActions.FETCH_MOST_POPULAR_ROADMAPS_SUCCESS:
            return fetchMostPopularRoadmapsSuccess(state, action)
        case RoadmapActions.FETCH_MOST_POPULAR_ROADMAPS_FAIL:
            return fetchMostPopularRoadmapsFail(state, action)

        case RoadmapActions.FETCH_HIGHEST_RATED_ROADMAPS_SUCCESS:
            return fetchHighestRatedRoadmapsSuccess(state, action)
        case RoadmapActions.FETCH_HIGHEST_RATED_ROADMAPS_FAIL:
            return fetchHighestRatedRoadmapsFail(state, action)

        case RoadmapActions.SEARCH_ROADMAPS_SUCCESS:
            return searchRoadmapsSuccess(state, action)
        case RoadmapActions.SEARCH_ROADMAPS_FAIL:
            return searchRoadmapsFail(state, action)
            
        default:
            return state
    }
}

export default roadmapReducer;