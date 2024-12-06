import { OrderItem } from "./order";

export interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string[] | undefined;
  price: number;
  brand: string;
  stock: number;
  slug: string;
  properties: Propertie;
  category: Category;
  categoryId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Categories {
  id: number;
  name: string;
  parentId: number | null;
  properties: Propertie[];
  createdAt: Date;
  updatedAt: Date;
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
  properties: Propertie[]
  createdAt?: Date;
  updatedAt?: Date;
}