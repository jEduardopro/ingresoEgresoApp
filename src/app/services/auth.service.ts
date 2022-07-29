import * as ingresoEgresoActions from './../store/ingresoEgreso/ingreso-egreso.actions';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import * as authActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs!: Subscription

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      // console.log({fUser});
      if (fUser) {
        this.userSubs = this.firestore.doc(`${fUser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            // console.log({firestoreUser});

            const user = User.fromFirebase(firestoreUser)
            this.store.dispatch(authActions.setUser({ user }))
          })

      } else {
        this.userSubs?.unsubscribe();
        this.store.dispatch(authActions.setUser({ user: null }))
        this.store.dispatch(ingresoEgresoActions.setItems({ items: [] }));
      }
    })
  }

  crearUsuario(nombre: string, email: string, passowrd: string) {

    return this.auth.createUserWithEmailAndPassword(email, passowrd)
      .then(({ user }) => {
        if (!user) {
          return;
        }
        const newUser = new User(user!.uid, nombre, user.email!)

        return this.firestore.doc(`${newUser.uid}/usuario`)
          .set({...newUser})
      })

  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    )
  }

}
