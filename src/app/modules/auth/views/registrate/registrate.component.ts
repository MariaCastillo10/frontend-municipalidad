import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AlertService } from '../../../../../shared/services/alert.service';
import { IRegisterData } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [AlertService, ConfirmationService, MessageService],
})
export class RegistrateComponent {
  returnUrl: string;
  viewPassword: boolean = false;

  registerData: IRegisterData = {
    nombres: '',
    email: '',
    password: '',
    telefono: '',
    esAdmin: false,
  };

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
  ) {}

  validateNames(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    return nameRegex.test(name);
  }

  validatePassword(password: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+|~=`{}[\]:";'<>?,./])[a-zA-Z0-9!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/;
    return passwordRegex.test(password);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateTelefono(telefono: string): boolean {
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(telefono);
  }

  // Opcional: Limita la entrada solo a números en tiempo real
  onTelefonoInput(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 9);
    this.registerData.telefono = event.target.value;
  }

  register() {
    this.registerData.nombres = this.registerData.nombres.trim();
    this.registerData.email = this.registerData.email.trim();
    this.registerData.password = this.registerData.password.trim();
    this.registerData.esAdmin = false;

    if (!this.registerData.email.trim() || !this.registerData.password.trim()) {
      this.alertService.warn('Ingrese un correo electrónico y contraseña');
      return;
    }

    if (!this.validateEmail(this.registerData.email)) {
      this.alertService.warn('El correo no es válido');
      return;
    }

    if (!this.validateTelefono(this.registerData.telefono)) {
      this.alertService.warn(
        'El teléfono debe tener exactamente 9 dígitos numéricos',
      );
      return;
    }

    if (!this.validateNames(this.registerData.nombres)) {
      this.alertService.warn(
        'El nombre debe tener al menos 3 caracteres y no debe contener números',
      );
      return;
    }

    if (!this.validatePassword(this.registerData.password)) {
      this.alertService.warn(
        'La contraseña debe tener al menos 8 caracteres, un número y símbolo especial',
      );
      return;
    }

    if (this.registerData.email === this.registerData.password) {
      this.alertService.warn('El correo y la contraseña no pueden ser iguales');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.alertService.success('Usuario registrado exitosamente');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.alertService.error('Error al registrar el usuario');
      },
    });
  }
}
