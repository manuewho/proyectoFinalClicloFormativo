import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from '../../servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private httpTipoUs: HttpServicioService, private ruta: Router) { }

  public ES=true;
  public EN=false;

  ngOnInit(): void {
    this.httpTipoUs.tipoUs();

    this.httpTipoUs.autenticarAntesContinuar().subscribe((res:any)=>{    
              this.cerrarSesionYborrar(res);   
    });
  }

  cerrarSesionYborrar(res:any){
    if (res.status!=localStorage.getItem("id")) {
      localStorage.setItem("token",'');
      localStorage.setItem("tipo",'');
      localStorage.setItem("id",'');
      localStorage.setItem("usuario",'');
      this.httpTipoUs.tipoUs();
      
    }
  }

  cambiaraIngles() {
    this.EN=true;
    this.ES=false;
  }
  cambiaraEspanol() {
    this.ES=true;
    this.EN=false;
  }

}
