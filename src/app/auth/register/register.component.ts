import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import * as ui from '../../store/ui/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  uiStoreSubscription!: Subscription;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });

    this.uiStoreSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(): void {
    this.uiStoreSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registerForm.invalid) { return }

    const { nombre, correo, password } = this.registerForm.value

    this.store.dispatch(ui.isLoading({status:true}))

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // })

    this.authService.crearUsuario(nombre, correo, password).then((credentials) => {

      // Swal.close();
      this.store.dispatch(ui.isLoading({ status: false }))
      this.router.navigate(['/']);

    })
      .catch((error) => {
      this.store.dispatch(ui.isLoading({ status: false }))
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      })
    });

    // console.log(this.registerForm);
    // console.log(this.registerForm.valid);
    // console.log(this.registerForm.value);

  }

}
