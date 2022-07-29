import * as authSelectors from './../../store/auth/auth.selectors';
import { AppState } from 'src/app/store/reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{

  sub!: Subscription;
  nombre: string = '';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(authSelectors.selectUsername)
        .subscribe(userName => this.nombre = userName ?? '')
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
