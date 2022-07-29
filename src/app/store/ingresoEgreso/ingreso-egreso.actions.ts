import { createAction, props } from '@ngrx/store';
import { ingresoEgresoActionTypes } from './ingreso-egreso.action.types';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';


export const setItems = createAction(
  ingresoEgresoActionTypes.SET_ITEMS,
  props<{items: IngresoEgreso[]}>()
)
