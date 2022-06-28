import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { GestionService } from 'src/app/servicios/gestion.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 2
    }
  ];
  public images:any[]=[
      {
        "previewImageSrc": "assets/img/home0.jpg",
        "thumbnailImageSrc": "assets/img/home0.jpg",
        "alt": "Description for Image 1Description for Image 1Description for Image 1Description for Image 1Description for Image 1",
        "title": "Title 1"
      },
      {
        "previewImageSrc": "assets/img/home6.jpg",
        "thumbnailImageSrc": "assets/img/home6.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      }, 
      {
        "previewImageSrc": "assets/img/home3.jpg",
        "thumbnailImageSrc": "assets/img/home3.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      },
      {
        "previewImageSrc": "assets/img/home4.jpg",
        "thumbnailImageSrc": "assets/img/home4.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      },
      {
        "previewImageSrc": "assets/img/home1.jpg",
          "thumbnailImageSrc": "assets/img/home1.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      }
  ];

  public tipoUSUARIO:any;

  constructor(private httpUs:HttpServicioService, private aruta:ActivatedRoute, private httpL: GestionService) { }

  ngOnInit(): void {

    this.tipoUSUARIO=localStorage.getItem("tipo");

    this.httpUs.tipoUs();
    this.httpUs.autenticarAntesContinuar().subscribe(res=>{
      this.cerrarSesionYborrar(res);
    });

   this.httpL.limpiarReservas().subscribe(res=>{
      //console.log(res);
   });

  }



  cerrarSesionYborrar(res:any){
    //console.log(res);
    if (res.status!=localStorage.getItem("id")) {
      localStorage.setItem("token",'');
      localStorage.setItem("tipo",'');
      localStorage.setItem("id",'');
      localStorage.setItem("usuario",'');
      this.httpUs.tipoUs();  
    }
  }

}
