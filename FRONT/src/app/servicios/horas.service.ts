import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HorasService {

  private url=environment.API_URL;

  constructor(private http:HttpClient) { }

  obtenerHoras () {
    return this.http.get<any[]>(this.url+'Hindex');
  }
  obtenerHoras2 () {
    return this.http.get<any[]>(this.url+'Hindex2');
  }

  obtenerHorasPorFecha (fecha:string, pista:string) {
    return this.http.get<any[]>(this.url+"FechaHindex/"+fecha+"/"+pista);
  }

  obtenerDiasCompletos (fechaI:string, fechaF:string, pista:string) {
    //console.log("http://localhost:8000/api/prueba/"+fechaI+"/"+fechaF+"/"+pista);
    return this.http.get<any[]>(this.url+"prueba/"+fechaI+"/"+fechaF+"/"+pista);

  }

  reservar (obj:any) {
    let params=JSON.stringify({
      "fecha":obj.fecha,
      "hora":obj.horas.hora,
      "usuario":obj.usuario,
      "codigoPista":obj.pista
    });
    


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })

    //console.log(params);

    return this.http.post<any>(this.url+"reservas",params, {headers:headers} );
  }

  horasPrecios(horas:any) {

    let params=JSON.stringify({
      "horas":horas
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    });

    //console.log(params);

    return this.http.post<any>(this.url+"horasprecio", params, {headers:headers})

  } 

  activarHorario(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    });
 
  
    return this.http.get(this.url+"activarHoras/"+id,{headers:headers})
  }

  desactivarHorario(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    });

  

    return this.http.get(this.url+"desactivarHoras/"+id, {headers:headers})

  }
}


