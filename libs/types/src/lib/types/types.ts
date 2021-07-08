export function types(): string {
  return 'types';
}

interface ObjectKeys {
  [key: string]: string | number |  null | undefined;
}


export interface User {
  _id: string;
  username: string;
  password?: string;
  address?: Address[];
}

export interface UserAuthSubmission {
  username: string;
  password?: string;
}

export interface Address extends ObjectKeys {
  _id: string;
  houseNumber: string;
  aptNumber: string;
  streetName: string;
  city: string;
  state: string;
  zip: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressSubmission {
  houseNumber: string;
  aptNumber: string;
  streetName: string;
  city: string;
  state: string;
  zip: number;
}

export interface FormSubmitType {
  login?: string;
  signup?: string;
}