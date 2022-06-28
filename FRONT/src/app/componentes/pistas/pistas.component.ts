import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from '../../servicios/http-servicio.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.css']
})
export class PistasComponent implements OnInit {

  public pistas:any[]=[];
  public tipos:any[]=[];
  public tamanos:any[]=[];
  public checked:boolean=false;
  public display2:boolean=false;


  public admin: Observable<string>= new Observable();
  public tipo:string='';

  public id:number=0;
  public codigo:string='';
  public abrir:boolean=false;


  constructor(private http: HttpServicioService, private ruta: Router) { }

  ngOnInit(): void {
    

    this.admin=this.http.obtenerTipoUs();
    //console.log(this.admin);
    this.admin.subscribe(res=>{
      //console.log(res);
      this.tipo=res;
    });
    
    this.http.tipoUs();
    
    this.http.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    

    this.http.obtenerPistas().subscribe(res=>{
      //console.log(res);
      this.pistas=res;
      this.checked=true;
    });

    this.http.obtenerTipos().subscribe(res=>{
      
      res.forEach(element => {
        this.tipos.push(element["suelo"]);
      });
     // console.log(this.tipos);

    });

    this.http.obtenerTamanos().subscribe(res=>{
      res.forEach(element => {
        this.tamanos.push(element["tamano"]);
      });
    });
  }

  cerrarSesionYborrar(res:any){
    if (res.status!=localStorage.getItem("id") || this.tipo!='1') {
      this.http.tipoUs();
      this.ruta.navigate(["inicio"]);
    }
  }



  eliminar (id:any) {
    
    if(id==1) {
      
        this.http.obtenerPistas().subscribe(res=>{
        //console.log(res);
        this.pistas=res;
        this.checked=true;
        });
  
        this.http.obtenerTipos().subscribe(res=>{
        
        res.forEach(element => {
          this.tipos.push(element["suelo"]);
        });
       // console.log(this.tipos);
  
        });
  
        this.http.obtenerTamanos().subscribe(res=>{
          res.forEach(element => {
            this.tamanos.push(element["tamano"]);
          });
        });

    } else if (id==-1) {
        this.display2=true;
    }

    this.id=0;
    this.codigo='';
    this.abrir=false;  
  }

  asignar(id:number, codigo:string) {
    this.id=id;
    this.codigo=codigo;
    this.abrir=true;
  }



}
