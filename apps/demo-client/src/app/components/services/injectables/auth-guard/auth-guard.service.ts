import { AuthService } from '../../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.checkUserLoggedIn();
    return this.authService.isDoneLoading$.pipe(take(1), map(() => {
      if(!this.authService.currentUser) {
        this.router.navigate(['/auth']);
        return false;
      } 
      return true;
    }), tap(() => this.authService.isDoneLoading$.isStopped))
    
  }

  constructor(private authService: AuthService, private router: Router) { }
}
