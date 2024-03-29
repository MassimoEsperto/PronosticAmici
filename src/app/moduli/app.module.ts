import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from '../app.component';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../pagine/login/login.component';
import { DashboardComponent } from '../pagine/dashboard/dashboard.component';
import { ShowcaseComponent } from '../pagine/showcase/showcase.component';
import { PageNotFoundComponent } from '../pagine/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../servizi/autenticazione/auth-guard';
import { AdministrationComponent } from '../pagine/administration/administration.component';
import { AuthAdmin } from '../servizi/autenticazione/auth-admin';
import { UtentiComponent } from '../pagine/administration/dati/utenti/utenti.component';
import { SquadreComponent } from '../pagine/administration/dati/squadre/squadre.component';
import { CannonieriComponent } from '../pagine/administration/dati/cannonieri/cannonieri.component';
import { CompetizioniComponent } from '../pagine/administration/dati/competizioni/competizioni.component';
import { SchedaMasterComponent } from '../pagine/administration/eventi/scheda-master/scheda-master.component';
import { AssCannonieriCompComponent } from '../pagine/administration/eventi/ass-cannonieri-comp/ass-cannonieri-comp.component';
import { AssSquadreCompComponent } from '../pagine/administration/eventi/ass-squadre-comp/ass-squadre-comp.component';
import { SchedeUtentiComponent } from '../pagine/schede-utenti/schede-utenti.component';
import { ClassificheComponent } from '../pagine/classifiche/classifiche.component';
import { GestioneSchedeComponent } from '../pagine/administration/dati/gestione-schede/gestione-schede.component';
import { FormCompetizioni } from '../componenti/my-form-modal/form-competizioni/form-competizioni.component';
import { FormUtente } from '../componenti/my-form-modal/form-utente/form-utente.component';
import { AssTipiPronosticiComponent } from '../pagine/administration/eventi/ass-tipi-pronostici/ass-tipi-pronostici.component';
import { FormScheda } from '../componenti/my-form-modal/form-scheda/form-scheda.component';
import { SchedeBloccateComponent } from '../pagine/schede-utenti/schede-bloccate/schede-bloccate.component';
import { SchedeSbloccateComponent } from '../pagine/schede-utenti/schede-sbloccate/schede-sbloccate.component';
import { SignInComponent } from '../pagine/login/sign-in/sign-in.component';
import { RegisterComponent } from '../pagine/login/register/register.component';
import { RecPassComponent } from '../pagine/login/rec-pass/rec-pass.component';
import { CalendarioComponent } from '../pagine/administration/risultati/calendario/calendario.component';
import { ViewScheda } from '../componenti/my-form-modal/view-scheda/view-scheda.component';
import { EventiModificabiliComponent } from '../pagine/administration/risultati/eventi-modificabili/eventi-modificabili.component';
import { SchedeConcluseComponent } from '../pagine/administration/risultati/schede-concluse/schede-concluse.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdministrationComponent,
    ShowcaseComponent,
    PageNotFoundComponent,
    UtentiComponent,
    SquadreComponent,
    CannonieriComponent,
    CompetizioniComponent,
    SchedaMasterComponent,
    AssCannonieriCompComponent,
    AssSquadreCompComponent,
    SchedeUtentiComponent,
    SchedeBloccateComponent,
    SchedeSbloccateComponent,
    ClassificheComponent,
    GestioneSchedeComponent,
    CalendarioComponent,
    FormCompetizioni,
    FormUtente,
    AssTipiPronosticiComponent,
    FormScheda,
    ViewScheda,
    SignInComponent,
    RegisterComponent,
    RecPassComponent,
    EventiModificabiliComponent,
    SchedeConcluseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,AuthAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
