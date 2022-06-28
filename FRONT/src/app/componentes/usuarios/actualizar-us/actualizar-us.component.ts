import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionService } from 'src/app/servicios/gestion.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';

@Component({
  selector: 'app-actualizar-us',
  templateUrl: './actualizar-us.component.html',
  styleUrls: ['./actualizar-us.component.css']
})
export class ActualizarUsComponent implements OnInit {

  public checked:boolean=false;
  public usuario:any;
  public display:boolean=false;
  constructor(private aruta:ActivatedRoute, private http:GestionService, private http2:HttpServicioService, private ruta:Router) { }

  ngOnInit(): void {
    this.http2.tipoUs();

    this.http2.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    this.usuario=this.aruta.snapshot.paramMap.get("us");
    this.http.unUsuario(this.usuario).subscribe(res=>{
     // console.log(res);
      this.usuario=res;
      
        if (this.usuario.tipo==1) {
          this.usuario.tipo=true;
        }else {
          this.usuario.tipo=false;
        }
        this.checked=true;
      
    });
    
  }

  actualizar(form:any) {
    if(form.tipo) {
      form.tipo=1;
    } else {
      form.tipo=2;
    }
    form.id=this.usuario.id;
   // console.log(form);

    this.http.modificarUsuario(form).subscribe(res=>{
      if(res=="NO3") {
        this.display=true;
      } else {
        this.ruta.navigate(["usuariosG"]);
      }
      
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

}
