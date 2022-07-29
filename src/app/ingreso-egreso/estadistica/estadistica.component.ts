import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as ingresoEgresoSelectors from '../../store/ingresoEgreso/ingreso-egreso.selectors';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0

  sub!: Subscription;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: []}
    ]
  };

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(ingresoEgresoSelectors.selectIEItems)
      .subscribe(items => this.generarEstadistica(items))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0

    for (const item of items) {
      if (item.tipo == 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData.datasets = [
      {
        data: [this.totalIngresos, this.totalEgresos]
      }
    ]
  }

}
