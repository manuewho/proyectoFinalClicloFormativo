import { Component, OnInit } from '@angular/core';
import { HttpServicioService } from 'src/app/servicios/http-servicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HorasService } from 'src/app/servicios/horas.service';
import { GestionService } from 'src/app/servicios/gestion.service';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  paymentHandler: any = null;
  public idR:any;
  public datosPago={
    fecha:'', 
    id:0,
    numeroH:Array(),
    pista:'',
    precio:0,
    horas:Array()
  };

  public total:number=0;
  public ho:any[]=[];
  public usuario:any;
  public usuarioId:any=0;
  public checked: boolean=false;
  public display:boolean=false;
  public display2:boolean=false;

  success: boolean = false
  failure:boolean = false

 

  constructor(private usHTTP: GestionService, private http:HorasService, private httpTipoUs: HttpServicioService, private ruta:Router, private aruta: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.httpTipoUs.tipoUs();
    this.httpTipoUs.autenticarAntesContinuar().subscribe((res:any)=>{    
      this.cerrarSesionYborrar(res);   
    });

    this.idR=this.aruta.snapshot.paramMap.get("obj");
   
    this.usuarioId=localStorage.getItem("id");

    this.usHTTP.unUsuario(this.usuarioId).subscribe(res=>{
      
      this.usuario=res.nombre;

      
    });

    this.datosPago=JSON.parse(this.idR);
    //console.log(this.datosPago);

    this.datosPago.horas.forEach(element => {
        console.log('');
    });
    
    this.http.horasPrecios(this.datosPago.horas).subscribe(res=>{
      //console.log(res);
      this.ho=res;
      res.forEach((element:any) => {
        this.total+=element.p;
      
        this.checked=true;
      });

    });

    this.invokeStripe();

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



  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KlF95HffVkbvH1FSO22zNuZAtgt9Ulr7wYnFk41T77mAjOCM8Cq4qi1oumPHuhtSAElmMUaqUJBsY3jat9Z8Spd003cRqepd8',
      locale: 'auto',
      token: function (stripeToken: any) {
        //console.log(stripeToken);
        paymentstripe(stripeToken);
      },
      
    });
    const paymentstripe = (stripeToken: any) => {
      this.httpTipoUs.makePayment(stripeToken, this.total).subscribe((data: any) => {
        //console.log(data);
        if (data='Funciona!') {
          this.display=true;
        } else {
          this.display2=true;
        }
        if (data.data === "success") {
          this.success = true;
          this.pagoRealizado();
        }
        else {
          this.failure = true;
          this.pagoRealizado();
        }
      });
    };

    
    paymentHandler.open({
      name: 'Padel Nuestro',
      description: '***',
      amount: amount * 100,
      
    });
  }

 

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KlF95HffVkbvH1FSO22zNuZAtgt9Ulr7wYnFk41T77mAjOCM8Cq4qi1oumPHuhtSAElmMUaqUJBsY3jat9Z8Spd003cRqepd8',
          locale: 'auto',
          token: function (stripeToken: any) {
           // console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  pagoRealizado() {
    let obj={
      fecha: this.datosPago.fecha,
      horas:this.datosPago.numeroH,
      usuario:localStorage.getItem("id"),
      pista:this.datosPago.pista
    }
    //console.log(obj);

    this.http.reservar(obj).subscribe(res=>{
      if (res.message=='OK') {
        this.ruta.navigate(["misReservas"]);

      }
      
    });
  }

  cancelar() {
    
      this.ruta.navigate(["pistasUS"]);
   
  }

}
