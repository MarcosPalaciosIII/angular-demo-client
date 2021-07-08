import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserAuthSubmission } from '@demo/types';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isDoneLoading$: Subject<void> = new Subject<void>();
  currentUser: User | null | undefined;
  
  constructor(private httpClient: HttpClient) {}
  
   checkUserLoggedIn() {
     return this.httpClient.get(`${environment.backendUrl}/auth/checklogin`, {withCredentials: true}).toPromise().then((apiResponse: any) => {
       this.isDoneLoading$.next();
       
       console.log({apiResponse})

       this.currentUser = apiResponse;

       return apiResponse;
     })
   }

   signUp(userInfo: UserAuthSubmission) {
    return this.httpClient.post(`${environment.backendUrl}/auth/signup`, userInfo, {withCredentials: true}).toPromise().then((apiResults: any) => {
      this.currentUser = apiResults;
      return apiResults;
    })
   }

   login(userInfo: UserAuthSubmission) {
     return this.httpClient.post(`${environment.backendUrl}/auth/login`, userInfo, {withCredentials: true}).toPromise().then((apiResults: any) => {
       this.currentUser = apiResults;
       return apiResults;
     })
   }

  logout() {
    return this.httpClient.delete(
      `${environment.backendUrl}/auth/logout`, {withCredentials: true}).toPromise().then((apiResult: any) => {
      this.currentUser = null;
      return apiResult;
    });
  }
  
  getUserAddress(userId: string) {
    return this.httpClient.get(
      `${environment.backendUrl}/user-address/${userId}`, {withCredentials: true}).toPromise().then((apiResult: any) => apiResult);
  }

}

