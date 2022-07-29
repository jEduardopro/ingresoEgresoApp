import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import * as authSelectors from '../store/auth/auth.selectors';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    let seletUid$ = this.store.pipe(select(authSelectors.selectUid))
    const uid = await firstValueFrom(seletUid$);

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {

    return this.firestore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map(snapshotDoc => snapshotDoc.map(doc =>
            ({
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          )
        )
      );
  }

  async borrarIngresoEgreso(uidItem: string) {
    let seletUid$ = this.store.pipe(select(authSelectors.selectUid))
    const uid = await firstValueFrom(seletUid$);

    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`)
        .delete()
  }

}
