import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/servicios/gestion.service';
import { HttpServicioService } from '../../servicios/http-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios:any[]=[];
  public usuariosFiltrados:any[]=[];
  public filtro:string='';
  public checked:boolean=false;

  public abrir:boolean=false;
  public idEli:number=-1;
  public emailEli:string='';

  public admin:boolean=true;
  public cli:boolean=false;

  public display:boolean=false;

  constructor(private http: GestionService, private http2:HttpServicioService,private ruta:Router) { }

  ngOnInit(): void {
    this.http2.tipoUs();

    this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });


    if (localStorage.getItem("tipo")=='1') {
      this.http.indexUsuarios().subscribe(res=>{
        res.forEach(element => {
          if (element.tipo==1) {
            element.tipo=true;
          } else {
            element.tipo=false;
          }
        });
        this.usuarios=res;
        this.usuariosFiltrados=this.usuarios;
        this.checked=true;
      });
    }
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

  actualizar(us:any) {
    this.ruta.navigate(["usuarioU/"+us]);
  }


  filtrar() {

    this.usuariosFiltrados=this.usuarios.filter( (ele:any) =>{
      return ((ele.nombre.toLowerCase().indexOf(this.filtro.toLowerCase())!=-1)||(ele.apellidos.toLowerCase().indexOf(this.filtro.toLowerCase())!=-1) || (ele.email.toLowerCase().indexOf(this.filtro.toLowerCase())!=-1));
    });
   // console.log(this.usuariosFiltrados);
  }

  ctipo(id:number,tipo:boolean) {
   // console.log(id+" "+tipo);
  }

  asignar(id:number,email:string) {
    this.idEli=id;
    this.emailEli=email;
    this.abrir=true;
  }

  eliminar(retorno:any) {
    this.abrir=false;
    this.idEli=-1;
    this.emailEli='';
    this.http.indexUsuarios().subscribe(res=>{
      res.forEach(element => {
        if (element.tipo==1) {
          element.tipo=true;
        } else {
          element.tipo=false;
        }
      });
      this.usuarios=res;
      this.usuariosFiltrados=this.usuarios;
    });
  
    if (retorno==0) {
      this.display=true;
    }
  }

}
