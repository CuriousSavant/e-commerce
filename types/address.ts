export interface Address {
  id?: number;
  fullName: string;
  phone: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  type?: string;
  isDefault?: boolean;
}