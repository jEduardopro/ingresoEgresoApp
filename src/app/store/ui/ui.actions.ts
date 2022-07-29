import { createAction, props } from "@ngrx/store";
import { uiActionTypes } from './ui.action.types';


export const isLoading = createAction(
  uiActionTypes.TOGGLE_LOADING,
  props<{ status: boolean }>()
)
