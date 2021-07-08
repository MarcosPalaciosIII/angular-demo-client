import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { AddressesComponent } from './components/addresses/address-components/address/addresses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UiModule } from '@demo/ui';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddressDetailsComponent } from './components/addresses/address-details/address-details.component';
import { AddressCreateComponent } from './components/addresses/address-create/address-create.component';


@NgModule({
  declarations: [AppComponent, LoginSignupComponent, AddressesComponent, DashboardComponent, NotFoundComponent, AddressDetailsComponent, AddressCreateComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    MatSidenavModule, 
    BrowserAnimationsModule, 
    NoopAnimationsModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
