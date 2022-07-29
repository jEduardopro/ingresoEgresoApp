import { createAction, props } from '@ngrx/store';
import { authActionTypes } from './auth.action.types';
import { User } from '../../models/user.model';

export const setUser = createAction(
  authActionTypes.SET_USER,
  props<{user: User | null}>()
)
