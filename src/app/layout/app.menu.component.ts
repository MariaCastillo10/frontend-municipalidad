import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  imports: [CommonModule, AppMenuitemComponent],
  standalone: true,
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    this.model = [
      // {
      //   label: 'Principales',
      //   icon: 'pi pi-th-large',
      //   items: [
      //     {
      //       label: 'Categorias',
      //       icon: 'pi pi-stop',
      //       routerLink: ['/categorys'],
      //     },
      //     {
      //       label: 'Clientes',
      //       icon: 'pi pi-users',
      //       routerLink: ['/customers'],
      //     },
      //     {
      //       label: 'Planillas',
      //       icon: 'pi pi-file',
      //       routerLink: ['/planilla/list'],
      //     },
      //     {
      //       label: 'Tolerancias',
      //       icon: 'pi pi-cog',
      //       routerLink: ['/tolerances'],
      //     },
      //     {
      //       label: 'Productos',
      //       icon: 'pi pi-fw pi-cart-plus',
      //       routerLink: ['/products'],
      //     },
      //   ],
      // },
      {
        label: 'Procesos',
        icon: 'pi pi-th-large',
        items: [
          {
            label: 'Divorcios',
            icon: 'pi pi-user-minus',
            routerLink: ['/inventario'],
          },
          {
            label: 'Licencias',
            icon: 'pi pi-id-card',
            routerLink: ['/licencia'],
          },
          {
            label: 'Permisos',
            icon: 'pi pi-id-card',
            routerLink: ['/permiso'],
          },
          {
            label: 'Rentas',
            icon: 'pi pi-id-card',
            routerLink: ['/rentas'],
          },
          {
            label: 'Resumen',
            icon: 'pi pi-id-card',
            routerLink: ['/resumen'],
          },

          // {
          //   label: 'Embalajes',
          //   icon: 'pi pi-fw pi-box',
          //   routerLink: ['/packaging'],
          // },
          // {
          //   label: 'Etiquetas',
          //   icon: 'pi pi-fw pi-tags',
          //   routerLink: ['/tags'],
          // },

          // {
          //   label: 'Localidades',
          //   icon: 'pi pi-map-marker',
          //   routerLink: ['/localities'],
          // },

          // {
          //   label: 'Plantas',
          //   icon: 'pi pi-fw pi-home',
          //   routerLink: ['/plants'],
          // },

          // {
          //   label: 'Variedades',
          //   icon: 'pi pi-th-large',
          //   routerLink: ['/varieties'],
          // },
        ],
      },
      // {
      //   label: 'Seguridad',
      //   icon: 'pi pi-th-large',
      //   items: [
      //     {
      //       label: 'Usuarios',
      //       icon: 'pi pi-fw pi-user',
      //       routerLink: ['/users'],
      //     },
      //   ],
      // },
      // {
      //   label: 'Procesos',
      //   icon: 'pi pi-th-large',
      //   items: [
      //     {
      //       label: 'pedido',
      //       icon: 'pi pi-fw pi-box',
      //       routerLink: ['/pedido'],
      //     },
      //     // {
      //     //   label: 'Temperatura',
      //     //   icon: 'pi pi-fw pi-box',
      //     //   routerLink: ['/temperature/list'],
      //     // },
      //   ],
      // },
    ];
  }
}
