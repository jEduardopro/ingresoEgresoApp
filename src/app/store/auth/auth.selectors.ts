import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>('auth')

export const selectUid = createSelector(
  getAuthState,
  (u) => u.user?.uid
)

export const selectUsername = createSelector(
  getAuthState,
  (u) => u.user?.nombre
)
