import { AddressService } from '../../../services/address/address.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, User } from '@demo/types';
import { fromPromise } from 'rxjs/internal-compatibility';
import { take } from 'rxjs/operators';

@Component({
  selector: 'demo-client-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  userAddresses: Address[] | undefined = [];
  user!: User | null | undefined;
  message = '';

  constructor(private router: Router, private authService: AuthService, private addressService: AddressService, ) { }

  ngOnInit(): void {
    this.setUser();
  }

  getUserAddresses() {
      fromPromise(this.authService.checkUserLoggedIn()).pipe(take(1)).subscribe(user => {
      console.log({user})
      this.userAddresses = user.address;
    })
  }

  deleteAddress(id: string) {
    fromPromise(this.addressService.deleteAddress(id)).pipe(take(1)).subscribe((response) => {
      this.message = response.message;
      setTimeout(() => {this.message = ''}, 3000)
      this.getUserAddresses()
    })
  }

  setUser() {
    this.user = this.authService.currentUser
    this.userAddresses = this.authService.currentUser?.address
  }
}
