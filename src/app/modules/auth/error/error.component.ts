import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    selector: 'app-error',
    templateUrl: './error.component.html',
    imports: [
        CommonModule,
        ButtonModule,
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorComponent {

}
