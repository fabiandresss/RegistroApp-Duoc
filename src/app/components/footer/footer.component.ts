import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pencilOutline, qrCodeOutline, personOutline } from 'ionicons/icons';
import { Usuario } from '../../model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonFooter,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonIcon
  ]
})
export class FooterComponent {
  selectedButton = 'codigoqr'; // Cambia esto a tu valor por defecto
  @Output() footerClick = new EventEmitter<string>();

  user: Usuario = new Usuario();
  isAdmin: boolean = false;
  username: string = '';
  constructor(private authService: AuthService, private databaseService: DatabaseService) {
    addIcons({ homeOutline, qrCodeOutline, pencilOutline, personOutline });
    this.authService.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
    // Cargar datos del usuario desde la base de datos
    this.cargarDatosUsuario();
  }

  // Este método se llama cuando se hace clic en un botón del footer
  sendClickEvent(event: any) {
    const button = event.detail.value; // Extrae el valor del botón seleccionado
    this.selectedButton = button; // Actualiza el botón seleccionado
    this.footerClick.emit(this.selectedButton); // Emite el evento con el botón seleccionado
  }
  async cargarDatosUsuario() {
      if (this.user.username === "admin") {
        this.isAdmin = true;
      } 
      console.log(this.user.username)
  }

}