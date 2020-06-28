import { createSelector } from 'reselect'

export const selectDiscipline = state => state.discipline;

export const selectAllDisciplines = createSelector(
    [selectDiscipline],
    discipline => discipline.disciplines
)