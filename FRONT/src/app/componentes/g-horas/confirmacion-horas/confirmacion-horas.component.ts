import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HorasService } from 'src/app/servicios/horas.service';
@Component({
  selector: 'app-confirmacion-horas',
  templateUrl: './confirmacion-horas.component.html',
  styleUrls: ['./confirmacion-horas.component.css']
})
export class ConfirmacionHorasComponent implements OnInit {

  @Input() horario= {
    hora:'',
    activo:0,
    id:-1
  }

  @Output() retor: EventEmitter<number>= new EventEmitter();

  public display:number=0;

  constructor(private http: HorasService) { }

  ngOnInit(): void {
    
    this.display=this.horario.activo;
    
  }

  volver() {
    this.retor.emit(0);
  }

  eliminar() {

    

    this.http.desactivarHorario(this.horario.id).subscribe(res=>{
      //console.log(res);
      
        this.retor.emit(-1);
      
    });

  }

  anadir() {

    this.http.activarHorario(this.horario.id).subscribe(res=>{
      //console.log(res);
      this.retor.emit(1);
    });

  }

}
