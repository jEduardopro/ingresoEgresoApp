import * as ingresoEgreso from './ingresoEgreso/ingreso-egreso.reducer';
import { ActionReducerMap } from "@ngrx/store";
import * as ui from "./ui/ui.reducer";
import * as auth from "./auth/auth.reducer";


export interface AppState {
  ui: ui.State,
  auth: auth.State,
  ingresosEgresos: ingresoEgreso.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}
