import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    if (this.registerForm.invalid) { return }

    const { nombre, correo, password } = this.registerForm.value

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })

    this.authService.crearUsuario(nombre, correo, password).then((credentials) => {

      Swal.close();

      this.router.navigate(['/']);

    })
    .catch((error) => {
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
