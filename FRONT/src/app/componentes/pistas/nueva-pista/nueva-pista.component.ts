import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { GestionService } from 'src/app/servicios/gestion.service';



class image {
  constructor(public src:string, public file: File) {}
}

@Component({
  selector: 'app-nueva-pista',
  templateUrl: './nueva-pista.component.html',
  styleUrls: ['./nueva-pista.component.css']
})
export class NuevaPistaComponent implements OnInit {

  public tamp:any[]=[];
  public tsue:any[]= [];

  
  public pagina:any;
  public codigo:string=''; 
  public ts:any= {
    name:"",
    id:-1
  };
  public tm:any= {
    name:"",
    id:-1
  };
  public iluminacion:boolean=false;
  public exterior:boolean=false;

  public boton:string='Añadir';
  public checked:boolean=false;

  public vacio: any;

  public display:boolean=false;
  


  constructor(private aruta:ActivatedRoute, private http:HttpServicioService, private ruta:Router, private httpG: GestionService) { 
   
  }

  ngOnInit(): void {

    this.http.tipoUs();

    this.http.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    
    this.pagina=this.aruta.snapshot.paramMap.get("id");  

    if (this.pagina!=-1) {
      this.checked=true;
      this.boton='Actualizar';
      this.http.unaPista(this.pagina).subscribe(res=>{
        this.codigo=res.numeracion;

        if (res.iluminacion==1) {
          this.iluminacion=true;
        }

        if (res.exterior==1) {
          this.exterior=true;
        }

        
        this.http.obtenerTamanos().subscribe(ress=>{
          ress.forEach(element => {
              if (element.id==res.tamanopista_id) {
                this.tm={
                  name:element.tamano,
                  id:element.id
                };
                
              }

              this.tamp.push({
                name:element.tamano,
                id:element.id
              });
            });
        });
        this.http.obtenerTipos().subscribe(ress=>{
          ress.forEach(element => {
            if (element.id==res.tipopista_id) {
              this.ts={
                name:element.suelo,
                id:element.id
              };
              
            }

            this.tsue.push({
              name:element.suelo,
              id:element.id
            });
          });

        });
      });

      this.checked=false;
    } else {

      this.http.obtenerTamanos().subscribe(res=>{
        res.forEach(element => {
          this.tamp.push({
            name:element.tamano,
            id:element.id
          });
        });
      });

      this.http.obtenerTipos().subscribe(res=>{
        res.forEach(element => {
          this.tsue.push({
            name:element.suelo,
            id:element.id
          });
        });
      });
    }
  }

  cerrarSesionYborrar(res:any){
    if (res.status!=localStorage.getItem("id")) {
      localStorage.setItem("token",'');
      localStorage.setItem("tipo",'');
      localStorage.setItem("id",'');
      localStorage.setItem("usuario",'');
      this.http.tipoUs();
      this.ruta.navigate(["inicio"]);
    }
  }

  /*imagen (file:any) {
    const fil:File=file.files[0];
    const rea= new  FileReader();

    rea.addEventListener('load', (event:any) =>{
        let i= new image(event.target.result, fil);
        this.http.guardarImagen(i).subscribe(res=>{
          console.log(res);
        });
        
    })

    rea.readAsDataURL(fil);
    
    

     
  }*/


  insertar(form:any) {

    

    if (form.iluminacion) {
      form.iluminacion=1;
    } else {
      form.iluminacion=0;
    }

    if (form.exterior) {
      form.exterior=1;
    } else {
      form.exterior=0;
    }

    //console.log(form);
    if (this.pagina==-1) {
        this.httpG.nuevaPista(form).subscribe(res=>{
          console.log(res);
          if (res=="NO3") {
            this.display=true;
          } else {
            this.ruta.navigate(["pistas"]);
          }
          
        });      
    } else {
      form.id=this.pagina;
      this.httpG.modPista(form).subscribe(res=>{
        console.log(res);
        if (res=="NO3") {
          this.display=true;
        }  else {
          this.ruta.navigate(["pistas"]);
        }
        
      });

  
    }
  }

}


