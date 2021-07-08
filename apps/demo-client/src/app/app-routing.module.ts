import { AddressesComponent } from './components/addresses/address-components/address/addresses.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './components/services/injectables/auth-guard/auth-guard.service';
import { AddressDetailsComponent } from './components/addresses/address-details/address-details.component';
import { AddressCreateComponent } from './components/addresses/address-create/address-create.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'auth', component: LoginSignupComponent },
  { path: 'addresses', component: AddressesComponent, canActivate: [AuthGuard] },
  { path: 'address/create', component: AddressCreateComponent, canActivate: [AuthGuard] },
  { path: 'address/:id', component: AddressDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
