import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GestionService } from 'src/app/servicios/gestion.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eli',
  templateUrl: './eli.component.html',
  styleUrls: ['./eli.component.css']
})
export class EliComponent implements OnInit {

  @Input() nombre:string='';
  @Input() id:number=-1;

  @Output() retorno: EventEmitter<number>=new EventEmitter();


  constructor(private http:GestionService,private http2: HttpServicioService, private ruta:Router ) { }

  ngOnInit(): void {
    this.http2.tipoUs();
    this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });
  }

  cerrarSesionYborrar(res:any){
    if (res.status!=localStorage.getItem("id")) {
      localStorage.setItem("token",'');
      localStorage.setItem("tipo",'');
      localStorage.setItem("id",'');
      localStorage.setItem("usuario",'');
      this.http2.tipoUs();
      this.ruta.navigate(["inicio"]);
    }
  }

  eliminar(){
    this.http.eliminarUs(this.id).subscribe(res=>{
      //console.log(res);
      if(res=='RESERVAS' || res=='NOEXISTE') {
        this.retorno.emit(0);

      }

      if(res=='OK') {
        this.retorno.emit(1);

      }

    })
 
  }

  volver() {
    this.retorno.emit(-1);
  }


}
