import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Usuario } from './model/usuario';
import { NivelEducacional } from './model/nivel-educacional';

describe('Comienzo aplicación', () =>{
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserModule, IonicModule.forRoot()],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('Crear la aplicación', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('El título de la aplicación debe ser "Sistema de asistencia DUOC UC"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    alert(app.title);
    expect(app.title).toEqual('Sistema de asistencia DUOC UC');
  });
});

describe('Pruebas clase "Usuario":', () => {

  let usuario: Usuario;

  beforeEach(() => {
    usuario = new Usuario();
  });

  describe('1.- "getNewUsuario":', () => {
    it('Crear nueva instancia de la clase "Usuario".', () => {
      const testuser = Usuario.getNewUsuario(
        'avalenzuela', 
        'avalenzuela@duocuc.cl', 
        'qwer', 
        'Nombre de su mejor amigo',
        'juanito',
        'Alberto', 
        'Valenzuela Nuñez',
        NivelEducacional.buscarNivel(5)!,
        new Date(2000, 1, 10),
        'La Pintana',
        'default-image.jpg'
      );
      expect(testuser).toBeTruthy();
      expect(testuser.username).toBe('avalenzuela');
    });
  });

  describe('2.- "validarCorreo":', () => {
    it ('Validar correo correctamente', () => {
      usuario.correo = '';
      expect(usuario.validarCorreo()).toContain('ingresar un correo electrónico');

      usuario.correo = 'prueba';
      expect(usuario.validarCorreo()).toContain('no tiene un formato válido');

      usuario.correo = 'atorres@duocuc.cl';
      expect(usuario.validarCorreo()).toEqual('');
    });
  });

  describe('3.-"validarPassword":', () => {
    it ('Validar contraseña correctamente', () => {
      usuario.password = '';
      expect(usuario.validarPassword()).toContain('ingresar la contraseña');

      usuario.password = '0';
      expect(usuario.validarPassword()).toContain('debe tener al menos 4 caracteres.');

      usuario.password = '1234';
      expect(usuario.validarPassword()).toEqual('');
    });
  });

  describe('4.-"validarUsername":', () => {
    it ('Validar username correctamente', () => {
      usuario.username = '';
      expect(usuario.validarUsername()).toContain('no puede estar vacío');

      usuario.username = 'ato';
      expect(usuario.validarUsername()).toContain('debe tener al menos 4 caracteres.');

      usuario.username = 'atorres';
      expect(usuario.validarUsername()).toEqual('');
    });
  });

  describe('5.-"validarNombreYApellido":', () => {
    it ('Validar nombre y apellido correctamente', () => {
      usuario.nombre = '';
      usuario.apellido = '';
      expect(usuario.validarNombreYApellido()).toContain('no pueden estar vacíos');

      usuario.nombre = 'Ana';
      usuario.apellido = 'Torres Leiva';
      expect(usuario.validarNombreYApellido()).toEqual('');
    });
  });

  describe('6.-"validarFraseYRespuestaSecreta":', () => {
    it ('Validar frase y respuesta secreta correctamente', () => {
      usuario.fraseSecreta = '';
      usuario.respuestaSecreta = '';
      expect(usuario.validarFraseYRespuestaSecreta()).toContain('no pueden estar vacías');

      usuario.fraseSecreta = 'Nombre de su mascota';
      usuario.respuestaSecreta = 'gato';
      expect(usuario.validarFraseYRespuestaSecreta()).toEqual('');
    });
  });
});