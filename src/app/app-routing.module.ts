import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authGuard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'admin',canActivate:[AuthGuard],    loadChildren: () => 
    import('./features/home/admin.module').then((m)=> m.AdminModule)
    
  },
  {path:'', redirectTo:'auth', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
