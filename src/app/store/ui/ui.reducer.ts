import { createReducer, on } from '@ngrx/store';
import { isLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(initialState,

  on(isLoading, (state, {status}) => ({...state, isLoading: status}))
)
