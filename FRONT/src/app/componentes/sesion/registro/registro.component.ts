import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public nombre='';
  public apellidos='';
  public email='';
  public pass1='';
  public pass2='';

  public mensajeErrorEmail='';
  public mensajeErrorEmail2='';

  public mensajeErrorContrasena='';

  constructor(private http: HttpServicioService, private ruta:Router ) { }

  ngOnInit(): void {
    this.http.tipoUs();
  
  }

 

  registrarse(form:any) {

    let okE=false;
    let ok=false;

    if (form.pass1!=form.pass2) {
      this.mensajeErrorContrasena='Las contraseñas no son iguales';
      
    } else if (form.pass1.length<6) {
      this.mensajeErrorContrasena='La contraseña debe tener al menos 6 carácteres';
      ok=false;
    } else {
      this.mensajeErrorContrasena='';
      ok=true;
    }

    this.http.verificarEmail(form.email).subscribe(res=>{
      //console.log(res);
      switch (res) {
        case('existe'):
          this.mensajeErrorEmail='Este email ya existe';
          okE=false;
          break;
        case('formato'):
          this.mensajeErrorEmail='Este email no es válido';
          okE=false;
          break;
        case('OK'): 
          this.mensajeErrorEmail='';
          okE=true;
          break;
      }
      

      if (ok && okE) {
        this.http.registro(form).subscribe(res=>{
          if (res=='creado') {
            this.ruta.navigate(["login"]);
          }
        });
      }

    });

    

    

    
  }

  capcha(valor:any) {
    //console.log(valor);
  }

}
