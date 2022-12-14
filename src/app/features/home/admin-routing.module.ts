import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthComponent } from '../auth/auth.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersStatsComponent } from './pages/users-stats/users-stats.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path:'', component:AdminComponent, children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'', redirectTo:'/admin/dashboard', pathMatch:'full'},
    {path:'users',component:UsersComponent},
    {path:'users-stats',component:UsersStatsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
