import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HorasService } from 'src/app/servicios/horas.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @Input() fecha:string='';
  @Input() pista:string='';
  @Output() retorno: EventEmitter<any>=new EventEmitter();
  public horarios=new Array;
  public horariosCerradas=new Array;
  public datosPago={
    fecha:'',
    id:0,
    numeroH:Array(),
    pista:'',
    precio:0,
    horas:Array(),
  };

  public hora:any[]=[];

  constructor(private http:HorasService,private httpTipoUs: HttpServicioService, private ruta:Router) {
   }

  ngOnInit(): void {
    this.httpTipoUs.tipoUs();
    this.httpTipoUs.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });
    
    this.http.obtenerHoras2().subscribe(res=>{
      this.llenarSelect(res);
      
    });

    
    
    

  }

  cerrarSesionYborrar(res:any){
    if (res.status!=localStorage.getItem("id")) {
      localStorage.setItem("token",'');
      localStorage.setItem("tipo",'');
      localStorage.setItem("id",'');
      localStorage.setItem("usuario",'');
      this.httpTipoUs.tipoUs();
      this.ruta.navigate(["inicio"]);
    }
  }

  llenarSelect(obj:any) {
    obj.forEach((element:any) => {
      this.horarios.push({name:element.hora,id:element.id,available:true});
    });

    this.http.obtenerHorasPorFecha(this.fecha,this.pista).subscribe(res=>{
      res.forEach(ele => {
  
          this.horarios.forEach(element => {
          //console.log(element.id+"-"+res);
          if (element.id==ele) {
            
            element.available=false;
          }
        });

      });
    });


  }

  volver() {
    this.retorno.emit("vuelvo");
  }

  reservar(seleccion:any) {
   
    //console.log(seleccion);
    this.datosPago.fecha=this.fecha;
    this.datosPago.numeroH=seleccion;
    this.datosPago.horas=seleccion.hora;
    this.datosPago.pista=this.pista;
    
    let objeto=JSON.stringify(this.datosPago);
    this.ruta.navigate(["pago/"+objeto]);

  }

}
