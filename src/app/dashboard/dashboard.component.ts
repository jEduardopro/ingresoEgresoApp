import * as authSelectors from '../store/auth/auth.selectors';
import * as ingresoEgresoActions from '../store/ingresoEgreso/ingreso-egreso.actions';
import { AppState } from '../store/reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    const getUid$ = this.store.select(authSelectors.selectUid)
      .pipe(
        filter(uid => uid != null),
      )
      .subscribe(uid => {
        if (!uid) {
          return;
        }
        const getItems$ = this.ingresoEgresoService.initIngresosEgresosListener(uid)
          .subscribe((ingresosEgresosFB: any[]) => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresosFB }))
          });
        this.subscriptions.add(getItems$)
      })
    this.subscriptions.add(getUid$)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
