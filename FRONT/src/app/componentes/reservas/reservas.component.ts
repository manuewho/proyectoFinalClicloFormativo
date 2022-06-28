import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HorasService } from 'src/app/servicios/horas.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { options } from 'preact';
import { DayGridView } from '@fullcalendar/daygrid';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  
})
export class ReservasComponent implements OnInit {


  public click:boolean=false;
  public fechaH:any;
  public idPista:any;
  public day:Date=new Date();
  public carga:boolean=false;
  public events: any[]=[];
  public bloqued: any[]=[];
  public options: CalendarOptions={};
 

  public  header: any;

  constructor(private ruta:Router, private aruta: ActivatedRoute, private http: HorasService, private httpTipoUs: HttpServicioService) { }

  ngOnInit(): void {

    this.httpTipoUs.tipoUs();

    this.httpTipoUs.autenticarAntesContinuar().subscribe((res:any)=>{    
              this.cerrarSesionYborrar(res);   
    });

    this.idPista=this.aruta.snapshot.paramMap.get("id");
    
    let fechaInicial=this.day.getFullYear()+"-"+(this.day.getMonth()+1)+"-"+this.day.getDate();
    let fechaFinal=this.day.getFullYear()+"-"+(this.day.getMonth()+2)+"-"+this.day.getDate();
    this.http.obtenerDiasCompletos(fechaInicial,fechaFinal,this.idPista).subscribe(res=>{
      this.cambiarCalendario(res);
 
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

  cambiarCalendario(obj:any) {
    
    if (obj.length!=0) {
      obj.forEach((element: string) => {
       // console.log(element);
        this.bloqued.push(element);
       this.events.push({
          allDay:true,
          editable:false,
          display:'background', 
          start: element + 'T00:00:00',
          backgroundColor:'rgb(205, 92, 92)'
         });
      });

    
    }

    if (this.day.getDate()>1) {

      for (let i=1; i<this.day.getDate(); i++) {
                  let day='';
                  if (i<10) {
                    day='0'+i;
                  } else {
                    day=''+i;
                  }
                  let mes='';
                  if (this.day.getMonth()<9) {
                    mes='0'+(this.day.getMonth()+1).toString();
                  } else {
                    mes=''+(this.day.getMonth()+1).toString();
                  }
        let fecha=this.day.getFullYear()+"-"+mes+"-"+day;

        //console.log(fecha);
        this.events.push({
          allDay:true,
          editable:false,
          display:'background', 
          start: fecha + 'T00:00:00',
          backgroundColor:'rgb(86, 101, 115)',
          
         });
        
      }
      
    };

    /*let vista='';
    if (window.innerWidth<800) {
      vista='dayGridDay';
    } else {
      vista='dayGridMonth';
    }*/


    this.options= {
      initialView: 'dayGridMonth',
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true,
      locale:'esLocale',
      contentHeight:'auto',
      firstDay:1,
      
      headerToolbar: {

        left: 'prev,next',
        right: 'title',
        
      },
      views: {
        dayGridMonth: { 
          titleFormat: { year: 'numeric', month:'short' }
        }, 
       /* dayGridDay: {
          titleFormat: { month:'short', day:'numeric' },
          dayCellContent:{ html: '<i class="pi pi-angle-double-left"></i>' },
          
        }*/
      },
      
      windowResize: function(views) {
        if (window.innerWidth<800) {
          //height:"600px";
        } else if (window.innerWidth>=800) {
          //contentHeight:"500px";
        }
        
      },
      
      events: this.events,
      
      dateClick: this.handleDateClick.bind(this),
      validRange : {
        start : new Date(this.day.getFullYear(),this.day.getMonth(),1), //start is today
        end : new Date(this.day.getFullYear(),this.day.getMonth()+1,this.day.getDate()) //end is 6 months from today
      }
    }

    

    this.carga=true;
  }


  handleDateClick (x:any) {
  let fecha=new Date(x.date);
  let bloqueo='';
  if (this.bloqued.length>0) {
    
    this.bloqued.forEach(element => {
      if (x.dateStr==element) {
        bloqueo=x;
      }
    });
  }

    if (fecha.getTime()<this.day.getTime()) {
     // console.log("menor");
    } else if (x==bloqueo) {
     // console.log("lleno");
    }  else {
   // console.log(x.dateStr);
    this.click=true;
    this.fechaH=x.dateStr;
    }
    
   
   
   // this.ruta.navigate([]);
    
  }

  retorno(retorno:any)  {
    this.click=false;
  }




  }
  


