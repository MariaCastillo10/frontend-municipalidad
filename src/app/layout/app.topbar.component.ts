import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { LayoutService } from './service/app.layout.service';

@Component({
  imports: [
    CommonModule,
    AppBreadcrumbComponent,
    InputTextModule,
    ButtonModule,
  ],
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopbarComponent {
  layoutService: LayoutService = inject(LayoutService);
  selectedLanguage: string = 'Español';
  dropdownVisible: boolean = false;
  fullwidth = false;

  @ViewChild('menubutton') menuButton!: ElementRef;

  onMenuButtonClick() {
    this.fullwidth = !this.fullwidth;
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language === 'es' ? 'Español' : 'English';
    this.dropdownVisible = false;
  }
}
