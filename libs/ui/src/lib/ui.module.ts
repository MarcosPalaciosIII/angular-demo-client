import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddressFormComponent } from './address-form/address-form.component'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatInputModule, MatProgressBarModule],
    declarations: [
      AuthFormComponent,
      AddressFormComponent
    ],
    exports: [AuthFormComponent, AddressFormComponent],
})
export class UiModule {}
