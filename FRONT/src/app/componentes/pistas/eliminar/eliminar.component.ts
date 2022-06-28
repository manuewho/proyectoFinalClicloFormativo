import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GestionService } from 'src/app/servicios/gestion.service';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  @Input() id:number=0;
  @Input() codigo:string='';

  @Output() retorno: EventEmitter<number>=new EventEmitter();

  constructor(private http:GestionService, private http2: HttpServicioService) { }

  ngOnInit(): void {
     this.http2.tipoUs();
     
  }

  eliminar() {
    this.http.eliminarPista(this.id).subscribe(res=>{
      if (res=='OK') {
        this.retorno.emit(1);
      } else if (res=='R') {
        this.retorno.emit(-1);
      } else {
        this.retorno.emit(0);
      }
    });
  }

  volver() {
    this.retorno.emit(0);
  }

}
