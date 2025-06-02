import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from './app.menu.component';
import { LayoutService } from './service/app.layout.service';
import { MenuService } from './service/app.menu.service';

@Component({
  imports: [CommonModule, RouterModule, AppMenuComponent],
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
  menuVisible: boolean = true;
  timeout: any = null;
  nombreUsuario: string = 'Usuario';
  esAdmin: boolean = false;

  @ViewChild('menuContainer') menuContainer!: ElementRef;
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.menuService.menuVisibility$.subscribe((visible) => {
      this.menuVisible = visible;
      this.cdr.detectChanges();
    });

    this.capturarNombre();
  }

  onMouseEnter() {
    if (!this.layoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.state.sidebarActive = true;
    }
  }

  capturarNombre() {
    const user = localStorage.getItem('PI_int_user');
    if (user) {
      const userObj = JSON.parse(user);
      this.nombreUsuario = userObj.name;
      this.esAdmin = userObj.esAdmin;
    }
  }

  onMouseLeave() {
    if (!this.layoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(
          () => (this.layoutService.state.sidebarActive = false),
          300,
        );
      }
    }
  }

  anchor() {
    this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }
}
