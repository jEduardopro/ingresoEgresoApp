import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import * as ingresoEgresoSelectors from '../../store/ingresoEgreso/ingreso-egreso.selectors';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  sub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(ingresoEgresoSelectors.selectIEItems)
      .subscribe(items => this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  borrar(item: any) {

    this.ingresoEgresoService.borrarIngresoEgreso(item.id)
      .then(() => {
        Swal.fire('Success', 'Item borrado', 'success')
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error')
      })

  }

}
