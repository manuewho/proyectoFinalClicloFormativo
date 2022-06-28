import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServicioService {

  private url= environment.API_URL;
  private tipoUsuario=new Subject<string>();
  private usuario:string;
  constructor(private http: HttpClient) {
    this.usuario='0';
   }

  obtenerPistas () {
    return this.http.get<any[]>(this.url+"Pindex");
  }

  obtenerTipos () {
    return this.http.get<any[]>(this.url+'Tindex');
  }

  obtenerTamanos () {
    return this.http.get<any[]>(this.url+'Tamindex');
  }

  inicioSesion (datos:any) {
    let params=JSON.stringify({
      "email":datos.usuario,
      "password":datos.contrasena
    });
    
    return this.http.post(this.url+"login",JSON.parse(params));
  }

  cierreSesion(token:any) {
    let params=JSON.stringify({
      "token":token

    })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })

    return this.http.post(this.url+"logout",JSON.parse(params),{headers:headers});

  }

  tipoUs() {
    //cambiar modo en que consigo los datos del usuario
    let variable:any;
    if (localStorage.getItem("tipo")!=null) {
      variable=localStorage.getItem("tipo");
    } else {
      variable=0;
    }
    this.usuario=variable;
    this.tipoUsuario.next(this.usuario);
  }

  obtenerTipoUs(): Observable<string> {
    return this.tipoUsuario.asObservable();
  }

  autenticarAntesContinuar() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    })
    return this.http.get(this.url+"logueado", {headers:headers});
  }

  verificarEmail(email:string)  {
    let params=JSON.stringify({
      email:email
    });

    return this.http.post<string>(this.url+"verificarEmail",JSON.parse(params))

  }

  registro(datos:any) {
    let  params=JSON.stringify({
      nombre:datos.nombre,
      apellidos:datos.apellidos,
      email:datos.email,
      password:datos.pass1,
      tipo:2
    });

    return this.http.post<string>(this.url+"registro",JSON.parse(params))
  }

  unaPista(id:number) {
    //Pindex/{id}
    return this.http.get<any>(this.url+"Pindex/"+id)
  }

  unaReserva (id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    });
    return this.http.get<any>(this.url+"unaReserva/"+id,{headers:headers});
  }

  ErrorPago (id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token")
    });
    return this.http.get<string>(this.url+"cancelR/"+id,{headers:headers});
  }

  makePayment(stripeToken: any, total:number): Observable<any>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+localStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    });

    //const url = "http://localhost:8000/api/checkout";
    stripeToken.amount=total*100;
    let params=JSON.stringify({
      email:stripeToken.email,
      id:stripeToken.id,
      amount:stripeToken.amount
    });

    console.log(params);
    return this.http.post<any>(this.url+"checkout",JSON.parse(params), {headers:headers})
  }


  
}

