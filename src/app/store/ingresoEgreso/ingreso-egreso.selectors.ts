import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from './ingreso-egreso.reducer';

export const getIngresosEgresos = createFeatureSelector<State>('ingresosEgresos')

export const selectIEItems = createSelector(
  getIngresosEgresos,
  (ie) => ie.items
)
