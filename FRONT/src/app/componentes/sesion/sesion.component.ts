import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  public usuario:string='';
  public salir:any;
  public iniciado:boolean=false;
  public contrasena:string='';
  public mensajeError:string='';
  public expirado:any;

  constructor(private http: HttpServicioService, private ruta:Router, private aruta:ActivatedRoute) { }

  ngOnInit(): void {

    if (localStorage.getItem("token")!='') {
      
      this.iniciado=true;
    }

    this.salir=this.aruta.snapshot.paramMap.get("salir");
    this.http.autenticarAntesContinuar().subscribe((res:any)=>{
        if(res.status!=localStorage.getItem("id"))  {
          this.cerrarSesion();
        }
    });

    if (this.salir==0) {
      this.cerrarSesion();
    }
  }

  cerrarSesion() {
    
    this.iniciado=false;

    this.http.cierreSesion(localStorage.getItem("token")).subscribe(res=>{
     // console.log(res);
    });

    localStorage.setItem("token",'');
    localStorage.setItem("tipo",'');
    localStorage.setItem("id",'');
    localStorage.setItem("usuario",'');
    this.http.tipoUs();  
    this.salir=null;
  }

  inicio(datos:any) {

    this.http.inicioSesion(datos).subscribe(res=>{
      let erre=<{"success":string}>res;
      //console.log(erre.success);
      if (erre.success=="errod") {
        this.mensajeError="El email o la contraseña son incorrectos";
        this.usuario='';
        this.contrasena='';
      } else {

            this.iniciado=true;
            let token=<{"token":string}>res;
            localStorage.setItem("token",token.token);
            let user=<{"user":{"email":string}}>res;
            let tipo=<{"user":{"tipo":number}}>res;
            let id=<{"user":{"id":number}}>res;

            //console.log(user.user.id);
            localStorage.setItem("tipo",tipo.user.tipo.toString());
            localStorage.setItem("usuario",user.user.email.toString());
            localStorage.setItem("id",id.user.id.toString());
            this.http.tipoUs();
            this.ruta.navigate(["inicio"]);
      }

    });    
    
  }

}
