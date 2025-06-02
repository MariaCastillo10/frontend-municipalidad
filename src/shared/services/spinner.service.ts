import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  spinnerStatus = false;
  constructor() {}

  spinnerOn() {
    this.spinnerStatus = true;
  }

  spinnerOff() {
    this.spinnerStatus = false;
  }

  getSpinnerStatus() {
    return this.spinnerStatus;
  }
}
