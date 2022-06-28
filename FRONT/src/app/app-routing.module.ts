import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GHorasComponent } from './componentes/g-horas/g-horas.component';
import { GestionReservasComponent } from './componentes/gestion-reservas/gestion-reservas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MisReservasComponent } from './componentes/mis-reservas/mis-reservas.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { PistasUsuariosComponent } from './componentes/pistas-usuarios/pistas-usuarios.component';
import { NuevaPistaComponent } from './componentes/pistas/nueva-pista/nueva-pista.component';
import { PistasComponent } from './componentes/pistas/pistas.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { RegistroComponent } from './componentes/sesion/registro/registro.component';
import { VerificacionComponent } from './componentes/sesion/registro/verificacion/verificacion.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { ActualizarUsComponent } from './componentes/usuarios/actualizar-us/actualizar-us.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InfoComponent } from './componentes/info/info.component';

const routes: Routes = [
  {
    path:"inicio/:ex",
    component: InicioComponent
  },
  {
    path:"",
    component: InicioComponent
  },
  {
    path:"inicio",
    component: InicioComponent
  },
  {
    path:"pistas",
    component: PistasComponent
  },
  {
    path:"reservas/:id",
    component: ReservasComponent
  },
  {
    path:"login",
    component: SesionComponent
  },
  {
    path:"login/:salir",
    component: SesionComponent
  },
  {
    path:"registro",
    component: RegistroComponent
  },
  {
    path:"menu/:condicion",
    component: MenuComponent
  },
  {
    path:"reservasG",
    component: GestionReservasComponent
  },
  {
    path:"misReservas",
    component: MisReservasComponent
  },
  {
    path:"usuariosG",
    component: UsuariosComponent
  },
  {
    path:"usuarioU/:us",
    component: ActualizarUsComponent
  },
  {
    path:"gestionp/:id",
    component: NuevaPistaComponent
  },
  {
    path:"pago/:obj",
    component: PagosComponent
  },
  {
    path:"pistasUS",
    component: PistasUsuariosComponent
  },
  {
    path:"gHoras",
    component: GHorasComponent
  },
  {
    path:"info",
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
