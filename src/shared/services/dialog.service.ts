import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PopupService {
    private displayPopupSubject = new BehaviorSubject<boolean>(false);
    private popupTitleSubject = new BehaviorSubject<string>('');
    private popupDataSubject = new BehaviorSubject<any>(null);

    displayPopup$ = this.displayPopupSubject.asObservable();
    popupTitle$ = this.popupTitleSubject.asObservable();
    popupData$ = this.popupDataSubject.asObservable();

    showPopup(title: string, data: any) {
        this.popupTitleSubject.next(title);
        this.popupDataSubject.next(data);
        this.displayPopupSubject.next(true);
    }

    hidePopup() {
        this.displayPopupSubject.next(false);
    }
}