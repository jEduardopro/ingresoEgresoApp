import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      console.log({fUser});
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
