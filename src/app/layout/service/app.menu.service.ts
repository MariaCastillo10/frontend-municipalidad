import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuChangeEvent } from '../api/menuchangeevent';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();
  private menuVisibilitySource = new BehaviorSubject<boolean>(false);

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();
  menuVisibility$ = this.menuVisibilitySource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }

  showMenu() {
    this.menuVisibilitySource.next(true);
  }

  hideMenu() {
    this.menuVisibilitySource.next(false);
  }
}
