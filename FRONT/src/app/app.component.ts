import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoIntegrado';

  public menu:any;
  constructor(private ruta:Router, private aruta: ActivatedRoute) {
    
   }

  ngOnInit(): void {

  }

 
}


