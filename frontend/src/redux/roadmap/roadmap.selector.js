import { createSelector } from 'reselect'

const selectRoadmap = state => state.roadmap;

export const selectRoadmapByUser = createSelector(
    [selectRoadmap],
    roadmap => roadmap.roadmapsByUser
)

export const selectAllRoadmaps = createSelector(
    [selectRoadmap],
    roadmap => roadmap.allRoadmaps
)

export const selectMostPopularRoadmaps = createSelector(
    [selectRoadmap],
    roadmap => roadmap.mostPopularRoadmaps
)

export const selectHighestRatedRoadmaps = createSelector(
    [selectRoadmap],
    roadmap => roadmap.highestRatedRoadmaps
)

export const selectSearchTerm = createSelector(
    [selectRoadmap],
    roadmap => roadmap.searchTerm
)

export const selectSearchResult = createSelector(
    [selectRoadmap],
    roadmap => roadmap.searchResult
)