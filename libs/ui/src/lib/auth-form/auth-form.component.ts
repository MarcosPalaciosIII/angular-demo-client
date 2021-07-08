import { AuthService } from "@services/auth/auth.service";
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormSubmitMethod } from '@demo/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'demo-client-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  authForm!: FormGroup;
  processing = false;
  error = '';
  formSubmitMethod = FormSubmitMethod;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.checkUserLoggedIn();
    this.initForm()
    if(this.authService.currentUser) {
      this.router.navigate(['']);
    }
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    console.log({ authUser: this.authService.currentUser });
    if(this.authService.currentUser) {
      this.router.navigate(['']);
    }
  }

  submit(submissionMethod: string) {
    if(this.authForm.valid) {
      this.clearError();
      this.processing = true;
      const { username, password} = this.authForm.value;

      if(submissionMethod === FormSubmitMethod.Signup){
        this.authService.signUp({username, password}).then((response) => {
          this.authService.checkUserLoggedIn();
          this.processing = false;
          response.success ? this.router.navigate(['']) : this.setError(response.error);
        }).catch((error: Error) => {
          this.processing = false;
          this.setError(error)
        })
      } else if (submissionMethod === FormSubmitMethod.Login) {
        this.authService.login({username, password}).then((response) => {
          this.authService.checkUserLoggedIn();
          this.processing = false;
          response.success ? this.router.navigate(['']) : this.setError(response.error);
        }).catch((error: Error) => {
          this.processing = false;
          this.setError(error)
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
