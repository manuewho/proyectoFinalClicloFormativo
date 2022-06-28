import { Component, OnInit } from '@angular/core';
import { HorasService } from 'src/app/servicios/horas.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-g-horas',
  templateUrl: './g-horas.component.html',
  styleUrls: ['./g-horas.component.css']
})
export class GHorasComponent implements OnInit {

  public horasPP:any[]= [];
  public horas:any[]=[];

  public horasHTML:any[]=[];

  public display:boolean=false;
  public obj={
    hora:'', 
    activo:0,
    id:-1
  };


  public dis1: boolean=false;
  public dis2: boolean=false;
  public dis3: boolean=false;

  public checked:boolean=false;

  constructor(private httph: HorasService, private http2: HttpServicioService, private ruta: Router) { }

  ngOnInit(): void {

    this.http2.tipoUs();

    this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    this.httph.obtenerHoras().subscribe(res=>{
      this.horas=res;
      //console.log(res);
      

      this.horas.sort(((a, b) => Number(a.hora.substring(0,2)) - Number(b.hora.substring(0,2))));
      //console.log(this.horas);
      this.checked=true;
      
      
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

  eliOana(obj:any) {
    //console.log(obj);
    this.display=true;
    this.obj=obj;
  }

  retorno(r:any) {

    //console.log(r);

    this.display=false;

    if (r==1) {

      this.checked=false;
      this.dis1=true;

      this.http2.tipoUs();
      this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
        this.cerrarSesionYborrar(res);   
      });

      this.httph.obtenerHoras().subscribe(res=>{
        this.horas=res;
        //console.log(res);
        
  
        this.horas.sort(((a, b) => Number(a.hora.substring(0,2)) - Number(b.hora.substring(0,2))));
        //console.log(this.horas);
        this.checked=true;
        
        
      });
      

    } else if (r==-1) {

      this.checked=false;
      this.dis2=true;
      
      
      this.http2.tipoUs();
      this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
        this.cerrarSesionYborrar(res);   
      });

      this.httph.obtenerHoras().subscribe(res=>{
        this.horas=res;
        //console.log(res);
        
  
        this.horas.sort(((a, b) => Number(a.hora.substring(0,2)) - Number(b.hora.substring(0,2))));
        //console.log(this.horas);
        this.checked=true;
        
        
      });
  
       
    } 

  

}

}



