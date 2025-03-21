import { Feature } from "@prisma/client";

export interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string[] | undefined;
  price: number;
  brandId: number | null;
  stock: number;
  slug: string;
  properties: Propertie;
  category: Category;
  status: 'ACTIVE' | 'INACTIVE';
  
  feature: Feature[]
  categoryId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Propertie {
  id?: number;
  name: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  parent: number | null;
  parentId: number | null;
  status: 'ACTIVE' | 'INACTIVE';
  product: Product;
  createdAt?: Date;
  updatedAt?: Date;
}