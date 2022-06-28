import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpServicioService } from '../../servicios/http-servicio.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pistas-usuarios',
  templateUrl: './pistas-usuarios.component.html',
  styleUrls: ['./pistas-usuarios.component.css']
})
export class PistasUsuariosComponent implements OnInit {

  public products: any []=[];
  public tipos:any[]=[];
  public tamanos:any[]=[];
  public sortOptions: SelectItem[]=[];
  public sortOrder: number=0;
  public sortField: string='';
  public sortKey: any;
  public checked:boolean=false;
  public display:boolean=false;

  constructor(private http: HttpServicioService, private primengConfig: PrimeNGConfig, private ruta: Router) { }

  ngOnInit(): void {

    this.http.obtenerPistas().subscribe(res=>{
      this.products=res;
     // console.log(res);
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

        this.checked=true;
      });


   
  this.primengConfig.ripple = true;

  }

  onSortChange(event: { value: any; }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  reservar(num:string) {

    this.http.autenticarAntesContinuar().subscribe(res=>{
      
      let sesion=<{"status":string}>res;
      if (sesion.status==localStorage.getItem("id")) {
        this.ruta.navigate(["reservas/"+num]);
      }else {
        localStorage.setItem("token",'');
        localStorage.setItem("tipo",'');
        localStorage.setItem("id",'');
        localStorage.setItem("usuario",'');
        this.http.tipoUs();
        this.display=true;
      }
    });

  }

}
