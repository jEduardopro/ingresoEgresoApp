import Swal from 'sweetalert2';
import { AppState } from 'src/app/store/reducers';
import { AuthService } from '../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from '../../store/ui/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading = false;
  uiStoreSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.uiStoreSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiStoreSubscription.unsubscribe()
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.store.dispatch(ui.isLoading({status: true}))

    // Swal.fire({
    //   title: 'Autenticando',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // })

    this.authService.login(email, password).then((data) => {
      // Swal.close()
      this.store.dispatch(ui.isLoading({ status: false }))
      this.router.navigate(['/'])
    })
      .catch((error) => {
      this.store.dispatch(ui.isLoading({ status: false }))
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      })
    })
  }

}
