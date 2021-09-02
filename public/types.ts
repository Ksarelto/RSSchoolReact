export interface Item {
  nameInput: string;
  lastnameInput: string;
  zipcodeInput: string;
  birthInput: string;
  countryInput: string;
  agreementInput: boolean;
  genderInput: boolean;
}

export interface Errors {
  name?: boolean;
  lastName?: boolean;
  zipCode?: boolean;
  birth?: boolean;
  country?: boolean;
  agreement?: boolean;
}
