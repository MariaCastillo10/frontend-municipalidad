import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { SessionService } from '../../shared/services/session.service';
import { LayoutService } from './service/app.layout.service';

@Component({
  imports: [CommonModule, SidebarModule, BadgeModule],
  standalone: true,
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
})
export class AppProfileSidebarComponent {
  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private sessionService: SessionService,
  ) {}

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  logout() {
    this.layoutService.state.profileSidebarVisible = false;
    this.sessionService.removesKeys();
    this.router.navigate(['/login']);
  }
}
