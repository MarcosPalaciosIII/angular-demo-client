import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './components/services/auth/auth.service';

@Component({
  selector: 'demo-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Demo App';

  constructor (
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.checkUserLoggedIn()
    .catch((error: Error) => {
      console.log({error})
      alert("Sorry! Something went wrong.")
    });
  }

  logout() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['']);
    })
    .catch((error: Error) => {
      console.log({error})
      alert("Sorry! Something went wrong.")
    });
  }
}
