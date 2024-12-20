export interface Address {
  id?: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  type?: string;
  isDefault?: boolean;
}