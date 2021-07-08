import { AuthService } from '@services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddressService } from '@services/address/address.service';
import { Subject, combineLatest } from 'rxjs';
import { User, Address, FormSubmitMethod } from '@demo/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { OnChange } from 'property-watch-decorator';

@Component({
  selector: 'demo-client-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  processing = false;
  error = '';
  user!: User;

  private destroyed$: Subject<void> = new Subject<void>();
  private formReady$: Subject<boolean> = new Subject<boolean>();
  private dataReady$: Subject<boolean> = new Subject<boolean>();

  formSubmitMethod = FormSubmitMethod

  @OnChange<Address>(function (this: any, value) {
    if(value) {
      this.dataReady$.next(true);
    }
  })
  @Input()
  data!: Address;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router,
    ) {
      this.defaultValues();
      this.setUser();
     }

  ngOnInit(): void {
    this.initForm();
    this.formReady$.next();
  }

  initForm() {
    this.addressForm = this.formBuilder.group({
      houseNumber: ['', Validators.required],
      aptNumber: [''],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
  }

  defaultValues() {
    combineLatest([this.formReady$, this.dataReady$]).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      Object.keys(this.addressForm.controls).forEach(control => {
        this.addressForm.controls[control].setValue(typeof this.data[control] !== 'undefined' ? this.data[control] : null)
      })
    })
  }

  setUser() {
    this.authService.checkUserLoggedIn().then((user) => {
      this.user = user;
    })
  }

  submit(submissionMethod: string) {
    if(this.addressForm.valid) {
      this.clearError();
      this.processing = true;
      
      if(submissionMethod === FormSubmitMethod.Create) {
        this.addressService.createAddress(this.user._id, this.addressForm.value).then(response => {
          this.processing = false;
          response.success ? this.router.navigate([`/addresses`]) : this.setError(response.error);
        })
      } else if (submissionMethod === FormSubmitMethod.Update) {
        this.addressService.updateAddress(this.data._id, this.addressForm.value).then(response => {
          this.processing = false;
          response.success ? this.router.navigate([`/addresses`]) : this.setError(response.error);
        })
      }
    }
  }

  clearError() {
    this.error = '';
  }

  setError(error: Error) {
    this.error = error.message;
  }
}

