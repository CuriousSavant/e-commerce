import { Propertie } from "@/types/product";

export type ProductFormStateProps = {
    productName: string;
    productDesc: string;
    price: number;
    stock: number;
    brandId: number | null | undefined;
    categoryId: number | null | undefined;
    properties: Propertie[];
}