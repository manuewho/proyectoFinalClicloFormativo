import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PistasComponent } from './componentes/pistas/pistas.component';
import {HttpClientModule} from '@angular/common/http';
import {AccordionModule} from 'primeng/accordion';     
import { MenuComponent } from './componentes/menu/menu.component';
import { FormsModule } from '@angular/forms';
import {SlideMenuModule} from 'primeng/slidemenu';
import {MenuModule} from 'primeng/menu';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import { ReservasComponent } from './componentes/reservas/reservas.component';


import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';

import {CheckboxModule} from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
import { HorariosComponent } from './componentes/reservas/horarios/horarios.component';

import {SelectButtonModule} from 'primeng/selectbutton';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { RegistroComponent } from './componentes/sesion/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { GestionReservasComponent } from './componentes/gestion-reservas/gestion-reservas.component';

import {InputSwitchModule} from 'primeng/inputswitch';
import { ConfirmacionComponent } from './componentes/gestion-reservas/confirmacion/confirmacion.component';
import { MisReservasComponent } from './componentes/mis-reservas/mis-reservas.component';
import { VerificacionComponent } from './componentes/sesion/registro/verificacion/verificacion.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EliComponent } from './componentes/usuarios/eli/eli.component';
import { ActualizarUsComponent } from './componentes/usuarios/actualizar-us/actualizar-us.component';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {GalleriaModule} from 'primeng/galleria';
import {CardModule} from 'primeng/card';
import { EliminarComponent } from './componentes/pistas/eliminar/eliminar.component';
import { NuevaPistaComponent } from './componentes/pistas/nueva-pista/nueva-pista.component';
import {DropdownModule} from 'primeng/dropdown';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { PistasUsuariosComponent } from './componentes/pistas-usuarios/pistas-usuarios.component';

import {DataViewModule} from 'primeng/dataview';
import { FooterComponent } from './componentes/footer/footer.component';
import { GHorasComponent } from './componentes/g-horas/g-horas.component';

import {DividerModule} from 'primeng/divider';
import { ConfirmacionHorasComponent } from './componentes/g-horas/confirmacion-horas/confirmacion-horas.component';
import { InfoComponent } from './componentes/info/info.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    PistasComponent,
    MenuComponent,
    ReservasComponent,
    HorariosComponent,
    SesionComponent,
    RegistroComponent,
    InicioComponent,
    GestionReservasComponent,
    ConfirmacionComponent,
    MisReservasComponent,
    VerificacionComponent,
    UsuariosComponent,
    EliComponent,
    ActualizarUsComponent,
    EliminarComponent,
    NuevaPistaComponent,
    PagosComponent,
    PistasUsuariosComponent,
    FooterComponent,
    GHorasComponent,
    ConfirmacionHorasComponent,
    InfoComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    FormsModule,
    SlideMenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    RatingModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    TabViewModule,
    FullCalendarModule,
    SelectButtonModule,
    InputSwitchModule,
    TriStateCheckboxModule,
    ProgressSpinnerModule,
    GalleriaModule,
    CardModule,
    DropdownModule,
    DataViewModule,
    DividerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
