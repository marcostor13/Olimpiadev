import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { VenuesComponent } from './components/pages/venues/venues.component';
import { EventsComponent } from './components/pages/events/events.component';
import { ComplexesComponent } from './components/pages/complexes/complexes.component';
import { AreasComponent } from './components/pages/areas/areas.component';
import { EquipmentComponent } from './components/pages/equipment/equipment.component';
import { CommissarsComponent } from './components/pages/commissars/commissars.component';
import { SportsComponent } from './components/pages/sports/sports.component';


const routes: Routes = [
  { path: '', component: VenuesComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'events', component: EventsComponent, pathMatch: 'full' },
  { path: 'venues', component: VenuesComponent, pathMatch: 'full' },
  { path: 'complexes', component: ComplexesComponent, pathMatch: 'full' },
  { path: 'areas', component: AreasComponent, pathMatch: 'full' },
  { path: 'equipment', component: EquipmentComponent, pathMatch: 'full' },
  { path: 'commissars', component: CommissarsComponent, pathMatch: 'full' },
  { path: 'sports', component: SportsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
