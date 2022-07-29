import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import * as authSelectors from './../../store/auth/auth.selectors';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  nombre: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(authSelectors.selectUsername)
      .subscribe(userName => this.nombre = userName ?? '')
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login'])
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
