export interface Product extends CreateProduct {
  id?: number;
}
export interface CreateProduct {
  category: string;
  variety: string;
  packaging: string;
}
