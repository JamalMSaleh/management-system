export interface Product extends CreateProduct {
  id?: number;
}
export interface CreateProduct {
  category: string;
  variety: string;
  packaging: string;
}
export interface PropsProducts {
  products: Product[];
}
export interface Id {
  id: number;
}
