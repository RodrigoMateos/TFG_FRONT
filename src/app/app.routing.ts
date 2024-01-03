import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PintarAulasComponent } from './components/pintar-aulas/pintar-aulas.component';
import { PintarClaseComponent } from './components/pintar-clase/pintar-clase.component';
import { CampusComponent } from './components/campus/campus.component';
import { NuevaAulaComponent } from './components/nueva-aula/nueva-aula.component';

const appRoutes: Routes = [
    {path: 'campus/:id', component: CampusComponent},
    {path: 'aula/:edificio/:campus/:clase', component: PintarAulasComponent},
    {path: 'clase/:edificio/:campus/:clase', component: PintarClaseComponent},
    {path: 'crear-aula/:campus', component: NuevaAulaComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'nueva-aula/:campus', component: NuevaAulaComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);