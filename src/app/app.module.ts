import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/partials/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadComponent } from './components/partials/load/load.component';
import { MenuComponent } from './components/partials/menu/menu.component';
import { VenuesComponent } from './components/pages/venues/venues.component';
import { EventsComponent } from './components/pages/events/events.component';
import { ComplexesComponent } from './components/pages/complexes/complexes.component';
import { AreasComponent } from './components/pages/areas/areas.component';
import { EquipmentComponent } from './components/pages/equipment/equipment.component';
import { CommissarsComponent } from './components/pages/commissars/commissars.component';
import { SportsComponent } from './components/pages/sports/sports.component';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './components/partials/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    LoadComponent,
    MenuComponent,
    VenuesComponent,
    EventsComponent,
    ComplexesComponent,
    AreasComponent,
    EquipmentComponent,
    CommissarsComponent,
    SportsComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
