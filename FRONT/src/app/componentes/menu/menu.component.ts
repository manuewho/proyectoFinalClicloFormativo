import { Component, Input, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  public tipo:string='0';
  private tipoUs: Observable<string>= new Observable();

  public items: MenuItem[]=[];
  public itemsAdmin: MenuItem[]=[];
  public itemsNous: MenuItem[]=[];

  public tipoUsuario:any;
  constructor(private http: HttpServicioService, private  aruta: ActivatedRoute, private ruta: Router) { }

  ngOnInit(): void {
    
    this.tipoUs=this.http.obtenerTipoUs();
    this.tipoUs.subscribe(
      res=> {
        //console.log(res);
        this.tipo=res;
      }
    );
  

    this.items = [
      {
          label: 'Inicio',
          icon: 'pi pi-home',
          routerLink: "inicio",
      },
      {
          label: 'Pistas',
          icon: 'pi pi-angle-double-right',
          items: [
              {label: 'Pistas de padel', icon: 'pi pi-sun', routerLink: "pistasUS",},
              
          ]
      },
      {
        label: 'Mis reservas',
        icon: 'pi pi-calendar',
        routerLink: "misReservas"
        
    },
    {
      label: 'Info',
      icon: 'pi pi-info-circle',
      routerLink: "info",
    },
    {
     label: 'Cerrar sesión', icon: 'pi pi-unlock',routerLink: "login/0",
    }      
    
  ];

  this.itemsAdmin = [
    {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: "inicio",
    },
    {
    label: 'Gestión',
    icon: 'pi pi-cog',
    items: [
        {label: 'Gestionar Reservas', icon: 'pi pi-cog', routerLink:"reservasG"},
        {label: 'Gestionar Usuario', icon: 'pi pi-cog',routerLink:"usuariosG"},
        {label: 'Gestionar Pistas', icon: 'pi pi-cog',routerLink:"pistas"},
        {label: 'Gestionar Horarios', icon: 'pi pi-cog',routerLink:"gHoras"}


        
    ]
    },
    {
      label: 'Info',
      icon: 'pi pi-info-circle',
      routerLink: "info",
    },
    {
      
      label: 'Cerrar sesión', icon: 'pi pi-unlock',routerLink: "login/0"

    }
];

this.itemsNous = [
  {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: "inicio",
  },
  
  {
      label: 'Pistas',
      icon: 'pi pi-angle-double-right',
      items: [
          {label: 'Pistas de padel', icon: 'pi pi-sun', routerLink: "pistasUS",},
      ]
  }
  ,
  {
    label: 'Info',
    icon: 'pi pi-info-circle',
    routerLink: "info",
  },
  {
      label: 'Login',
      icon: 'pi pi-user',
      items: [
          {label: 'Inicio sesión', icon: 'pi pi-unlock',routerLink: "login",},
          {label: 'Registro', icon: 'pi pi-id-card',routerLink:"registro"}

      ]
  }
];


  //this.ruta.navigate([""]);


  }

}
