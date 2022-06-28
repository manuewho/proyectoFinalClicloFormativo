import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private url= environment.API_URL;

  constructor(private HTTP: HttpClient) { }

  indexReservas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get<any[]>(this.url+"reservas", {headers:headers});
  }

  borrarReserva(id:number) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get(this.url+"reservas/"+id,{headers:headers});

  }

  indexUsuarios() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get<any[]>(this.url+"index",{headers:headers});
  }

  eliminarUs(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get<string>(this.url+"eliminar/"+id,{headers:headers} );

  }

  unUsuario(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get<any>(this.url+"uno/"+id,{headers:headers} );

  }

  modificarUsuario(us:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    let params=JSON.stringify({
      "nombre":us.nombre,
      "apellidos":us.apellidos,
      "email":us.email,
      "tipo":us.tipo,
      "id":us.id
    });

    return this.HTTP.post<string>(this.url+"update",JSON.parse(params),{headers:headers})
  }

  eliminarPista (id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.HTTP.get<string>(this.url+"pistas/"+id,{headers:headers});
  }

  nuevaPista(datos:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    let params=JSON.stringify({
      "numeracion": datos.numeracion,
      "exterior": datos.exterior,
      "tipopista_id": datos.tipop.id,
      "tamanopista_id": datos.tamano.id,
      "iluminacion": datos.iluminacion 
    });

    return this.HTTP.post<string>(this.url+"pistas", JSON.parse(params),{headers:headers});

  }

  modPista(datos:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    let params=JSON.stringify({
      "numeracion": datos.numeracion,
      "exterior": datos.exterior,
      "tipopista_id": datos.tipop.id,
      "tamanopista_id": datos.tamano.id,
      "iluminacion": datos.iluminacion 
    });
    //console.log(params);
    return this.HTTP.post<string>(this.url+"pistasM/"+datos.id, JSON.parse(params),{headers:headers});

  }

  limpiarReservas() {
    

    return this.HTTP.get<string>(this.url+"limpiarReservas");
  }
}
