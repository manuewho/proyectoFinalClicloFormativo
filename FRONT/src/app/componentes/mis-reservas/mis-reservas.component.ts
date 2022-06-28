import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/servicios/gestion.service';
import { HttpServicioService } from '../../servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {


  public reservas:any[]=[];
  public fechas:any[]=[];
  public fechas2:any[]=[];
  public sinReservas:boolean=true;
  public carga:boolean=false;

  public fechaEnvio:string='';
  public horaEnvio:string='';
  public idEnvio:number=-1;
  public abrir:boolean=false;

  constructor(private http: GestionService, private http2:  HttpServicioService, private ruta:Router) { }

  ngOnInit(): void {

    this.http2.tipoUs();
    this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    this.http.indexReservas().subscribe(res=>{
      
      //console.log(res);

      Object.entries(res).forEach(([key, value]) => {
        

        if (value.user==localStorage.getItem("id")) {
          //console.log("noentry");
          this.fechas.push(value.fecha);
          this.reservas.push({fecha:value.fecha,pista:value.codigoP, usuario:value.nombre,apellidos:value.apellidos, horas:value.horita});
        }
      });

      if(this.fechas.length==0){
        this.sinReservas=false;
      } else {
        this.carga=true;
      }
      this.fechas2.push(new Set(this.fechas));
      
      let arr = Array.from(this.fechas2[0]);
      arr.sort((b:any, a:any) => new Date(b).getTime() - new Date(a).getTime());
      this.fechas2.pop();
      this.fechas2.push(arr);
      
      
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

  eliminar(id:number) {

    this.abrir=false;
    this.fechaEnvio='';
    this.horaEnvio='';
    this.idEnvio=-1;

    if(id==1) {

      this.http.indexReservas().subscribe(res=>{
      
        //  console.log(res);
        this.reservas=[];

          Object.entries(res).forEach(([key, value]) => {
          
            if (value.user==localStorage.getItem("id")) {
             // console.log("noentry");
              this.fechas.push(value.fecha);
              this.reservas.push({fecha:value.fecha,pista:value.codigoP, usuario:value.nombre,apellidos:value.apellidos, horas:value.horita});
            }
          });

          this.fechas2.push(new Set(this.fechas));
          
          let arr = Array.from(this.fechas2[0]);
          arr.sort((b:any, a:any) => new Date(b).getTime() - new Date(a).getTime());
          this.fechas2.pop();
          this.fechas2.push(arr);
          
          
      });
    } else if(id!=0) {
      alert("Ha habido un error al eliminar")
    }

   
  }


  asignar(id:number,fecha:string,hora:string) {

    this.idEnvio=id;
    this.fechaEnvio=fecha;
    this.horaEnvio=hora;
    this.abrir=true;

  }


 
}
