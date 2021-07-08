import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '@demo/types';
import { AddressService } from '@services/address/address.service';
import { AuthService } from '@services/auth/auth.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { take } from 'rxjs/operators';

@Component({
  selector: 'demo-client-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  userAddress!: Address;

  constructor(private route: ActivatedRoute, private authService: AuthService, private addressService: AddressService, ) { }

  ngOnInit(): void {
    this.getAddressesDetails(this.route.snapshot);
  }

  getAddressesDetails(route: ActivatedRouteSnapshot) {
    console.log({route})
      fromPromise(this.addressService.getAddress(route.params.id)).pipe(take(1)).subscribe(address => {
        console.log({address})
        this.userAddress = address.address;
      })
  }
}
