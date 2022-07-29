import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    const { email, password } = this.loginForm.value;

    Swal.fire({
      title: 'Autenticando',
      didOpen: () => {
        Swal.showLoading()
      },
    })

    this.authService.login(email, password).then((data) => {
      console.log({ data });
      Swal.close()

      this.router.navigate(['/'])
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      })
    })
  }

}
