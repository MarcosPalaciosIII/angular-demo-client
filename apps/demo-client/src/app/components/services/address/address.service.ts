import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressSubmission } from '@demo/types';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddresses() {
    return this.httpClient.get(`${environment.backendUrl}/address/addresses`, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }

  removeUserAddress(addressId: string) {
    return this.httpClient.put(`${environment.backendUrl}/address/remove/${addressId}`, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }

  createAddress(userId: string, addressInfo: AddressSubmission) {
    return this.httpClient.post(`${environment.backendUrl}/address/${userId}`, addressInfo, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }

  getAddress(addressId: string) {
    return this.httpClient.get(`${environment.backendUrl}/address/${addressId}`, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }

  updateAddress(addressId: string, addressInfo: AddressSubmission) {
    return this.httpClient.put(`${environment.backendUrl}/address/${addressId}`, addressInfo, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }

  deleteAddress(addressId: string) {
    return this.httpClient.delete(`${environment.backendUrl}/address/${addressId}`, {withCredentials: true}).toPromise().then((apiResponse: any) => apiResponse)
  }
}
