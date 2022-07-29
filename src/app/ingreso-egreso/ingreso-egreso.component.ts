import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { map, Subscription } from 'rxjs';
import * as uiActions from '../store/ui/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm!: FormGroup;
  tipo = 'ingreso';
  loading = false;
  sub!: Subscription

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select('ui').pipe(
      map(ui => ui.isLoading)
    ).subscribe(isLoading => this.loading = isLoading)

    this.ingresoForm = this.fb.group({
      desc: ['', [Validators.required]],
      monto: ['', [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  guardar() {

    this.store.dispatch(uiActions.isLoading({ status: true }))


    const { desc, monto } = this.ingresoForm.value;
    const ingresEgreso = new IngresoEgreso(desc, monto, this.tipo)

    this.ingresoEgresoService.crearIngresoEgreso(ingresEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(uiActions.isLoading({ status: false }))
        Swal.fire('Registro creado', desc, 'success')

      })
      .catch((error) => {
        this.store.dispatch(uiActions.isLoading({ status: false }))
        Swal.fire('Error', error.message, 'error')
      })

  }

}
